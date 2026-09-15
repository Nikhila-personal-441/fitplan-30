// ============================================================
// mixins/tracking-api.mo — Public API for step count and water intake
// ============================================================
import Time        "mo:core/Time";
import Map         "mo:core/Map";
import ProfileTypes  "../types/profile";
import TrackingTypes "../types/tracking";
import TrackingLib   "../lib/tracking";

mixin (
  trackingMap : Map.Map<Text, TrackingTypes.DailyTracking>,
  profiles    : Map.Map<Principal, ProfileTypes.UserProfile>,
) {

  // ── Step count ───────────────────────────────────────────

  /// Save (or update) the step count for the calling user on the given date.
  /// Date must be "YYYY-MM-DD". Replaces any existing count for that date.
  /// Intended to be called in a debounced fashion (every ~30 seconds).
  public shared ({ caller }) func saveStepCount(
    date  : Text,
    steps : Nat,
  ) : async () {
    TrackingLib.saveStepCount(trackingMap, caller, date, steps, Time.now());
  };

  /// Return the step count for the calling user on the given date.
  /// Returns 0 steps if no data has been saved for that date.
  public shared query ({ caller }) func getStepCount(
    date : Text,
  ) : async TrackingTypes.DailyStepCount {
    TrackingLib.getStepCount(trackingMap, caller, date)
  };

  // ── Water intake ─────────────────────────────────────────

  /// Append a water intake entry for the calling user on today's date.
  /// `date` must be "YYYY-MM-DD" (caller provides current local date).
  public shared ({ caller }) func addWaterEntry(
    date     : Text,
    amountMl : Nat,
  ) : async () {
    TrackingLib.addWaterEntry(trackingMap, caller, date, amountMl, Time.now());
  };

  /// Remove the last water entry for the calling user on the given date.
  /// No-op if there are no entries for that date.
  public shared ({ caller }) func clearLastWaterEntry(
    date : Text,
  ) : async () {
    TrackingLib.clearLastWaterEntry(trackingMap, caller, date);
  };

  /// Return all water entries and summary for the calling user on the given date.
  public shared query ({ caller }) func getWaterIntake(
    date : Text,
  ) : async TrackingTypes.DailyTrackingSummary {
    let flexLvl = switch (profiles.get(caller)) {
      case (?p) { p.flexibilityLevel };
      case null { 1 };
    };
    TrackingLib.getSummary(trackingMap, caller, date, flexLvl)
  };

  // ── Combined daily summary ───────────────────────────────

  /// Return a combined tracking summary (water + steps) for the given date.
  public shared query ({ caller }) func getDailyTrackingSummary(
    date : Text,
  ) : async TrackingTypes.DailyTrackingSummary {
    let flexLvl = switch (profiles.get(caller)) {
      case (?p) { p.flexibilityLevel };
      case null { 1 };
    };
    TrackingLib.getSummary(trackingMap, caller, date, flexLvl)
  };
};
