// ============================================================
// lib/tracking.mo — Domain logic for step count and water intake
//
// State is injected; this module is stateless.
// Keys: composite (Principal, DateKey) encoded as Text.
// ============================================================
import Time     "mo:core/Time";
import Map      "mo:core/Map";
import Array    "mo:core/Array";
import Types    "../types/tracking";
import Common   "../types/common";

module {

  // ── Key helpers ──────────────────────────────────────────

  /// Encode a (Principal, DateKey) pair into a single Text map key.
  public func makeKey(p : Principal, date : Common.DateKey) : Text {
    p.toText() # "#" # date
  };

  // ── Water intake ─────────────────────────────────────────

  /// Return all water entries for (caller, date). Empty list if none.
  public func getWaterEntries(
    trackingMap : Map.Map<Text, Types.DailyTracking>,
    caller      : Principal,
    date        : Common.DateKey,
  ) : [Types.WaterEntry] {
    let key = makeKey(caller, date);
    switch (trackingMap.get(key)) {
      case (?record) { record.waterEntries };
      case null      { [] };
    }
  };

  /// Append a new water entry for (caller, date).
  public func addWaterEntry(
    trackingMap : Map.Map<Text, Types.DailyTracking>,
    caller      : Principal,
    date        : Common.DateKey,
    amountMl    : Nat,
    now         : Common.Timestamp,
  ) : () {
    let key     = makeKey(caller, date);
    let entry   : Types.WaterEntry = { timestamp = now; amountMl };
    let current = switch (trackingMap.get(key)) {
      case (?r) { r };
      case null { newDailyTracking(caller, date, now) };
    };
    let updated = { current with waterEntries = current.waterEntries.concat([entry]) };
    trackingMap.add(key, updated);
  };

  /// Remove the most recent water entry for (caller, date).
  /// No-op if there are no entries.
  public func clearLastWaterEntry(
    trackingMap : Map.Map<Text, Types.DailyTracking>,
    caller      : Principal,
    date        : Common.DateKey,
  ) : () {
    let key = makeKey(caller, date);
    switch (trackingMap.get(key)) {
      case null { () };
      case (?record) {
        let entries = record.waterEntries;
        let len     = entries.size();
        if (len == 0) { return };
        // Drop the last entry
        let trimmed = entries.sliceToArray(0, len - 1 : Int);
        trackingMap.add(key, { record with waterEntries = trimmed });
      };
    }
  };

  // ── Step count ───────────────────────────────────────────

  /// Return the step count record for (caller, date). Defaults to zero.
  public func getStepCount(
    trackingMap : Map.Map<Text, Types.DailyTracking>,
    caller      : Principal,
    date        : Common.DateKey,
  ) : Types.DailyStepCount {
    let key = makeKey(caller, date);
    switch (trackingMap.get(key)) {
      case (?r) { r.stepCount };
      case null {
        { date; steps = 0; lastUpdated = 0 }
      };
    }
  };

  /// Upsert the step count for (caller, date).
  public func saveStepCount(
    trackingMap : Map.Map<Text, Types.DailyTracking>,
    caller      : Principal,
    date        : Common.DateKey,
    steps       : Nat,
    now         : Common.Timestamp,
  ) : () {
    let key     = makeKey(caller, date);
    let current = switch (trackingMap.get(key)) {
      case (?r) { r };
      case null { newDailyTracking(caller, date, now) };
    };
    let newStep : Types.DailyStepCount = { date; steps; lastUpdated = now };
    trackingMap.add(key, { current with stepCount = newStep });
  };

  // ── Summary ──────────────────────────────────────────────

  /// Build a DailyTrackingSummary for the given caller and date.
  /// waterGoalMl is computed from the caller's flexibility level.
  public func getSummary(
    trackingMap    : Map.Map<Text, Types.DailyTracking>,
    caller         : Principal,
    date           : Common.DateKey,
    flexibilityLvl : Nat,
  ) : Types.DailyTrackingSummary {
    let key     = makeKey(caller, date);
    let record  = switch (trackingMap.get(key)) {
      case (?r) { r };
      case null { newDailyTracking(caller, date, 0) };
    };
    let entries     = record.waterEntries;
    let totalWater  = entries.foldLeft(0, func(acc : Nat, e : Types.WaterEntry) : Nat { acc + e.amountMl });
    {
      date          = date;
      totalWaterMl  = totalWater;
      waterGoalMl   = waterGoalFromFlex(flexibilityLvl);
      waterEntries  = entries;
      steps         = record.stepCount.steps;
      lastUpdated   = record.stepCount.lastUpdated;
    }
  };

  // ── Internal helpers ─────────────────────────────────────

  /// Create a blank DailyTracking record for (caller, date).
  public func newDailyTracking(
    caller : Principal,
    date   : Common.DateKey,
    now    : Common.Timestamp,
  ) : Types.DailyTracking {
    {
      principal    = caller;
      date         = date;
      waterEntries = [];
      stepCount    = { date; steps = 0; lastUpdated = now };
    }
  };

  /// Compute the water goal in ml from a flexibility level (1–5).
  /// Formula: 2000 + 500 * (flexibilityLvl / 5)  (integer division)
  public func waterGoalFromFlex(flexibilityLvl : Nat) : Nat {
    2000 + 500 * (flexibilityLvl / 5)
  };
};
