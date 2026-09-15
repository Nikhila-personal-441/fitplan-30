// ============================================================
// types/tracking.mo — Step count and water intake domain types
//
// Data is keyed per-user per calendar date ("YYYY-MM-DD").
// Water entries accumulate throughout the day; steps are
// updated (debounced) from the device motion sensor.
// ============================================================
import Common "common";

module {

  /// A single water intake event logged by the user.
  public type WaterEntry = {
    timestamp : Common.Timestamp;  // nanoseconds, Time.now()
    amountMl  : Nat;               // millilitres added
  };

  /// Aggregated step count for one calendar day — device-sourced.
  public type DailyStepCount = {
    date        : Common.DateKey;  // "YYYY-MM-DD"
    steps       : Nat;
    lastUpdated : Common.Timestamp;
  };

  /// All tracking data for one user on one calendar day.
  /// Keyed in state by (Principal, DateKey).
  public type DailyTracking = {
    principal    : Principal;
    date         : Common.DateKey;
    waterEntries : [WaterEntry];          // ordered list of water logs
    stepCount    : DailyStepCount;
  };

  /// Summary view returned to the frontend.
  public type DailyTrackingSummary = {
    date          : Common.DateKey;
    totalWaterMl  : Nat;           // sum of all WaterEntry.amountMl for the day
    waterGoalMl   : Nat;           // personalised daily water goal
    waterEntries  : [WaterEntry];  // individual entries (for undo / display)
    steps         : Nat;
    lastUpdated   : Common.Timestamp;
  };
};
