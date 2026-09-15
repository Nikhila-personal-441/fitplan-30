// ============================================================
// mixins/fitness-api.mo — Public API for the 30-day plan
//
// getDayPlan and getAllDayPlans filter exercises by the caller's
// fitnessTrack stored in their profile.
// ============================================================
import Map          "mo:core/Map";
import Types        "../types/fitness";
import ProfileTypes "../types/profile";
import FitnessLib   "../lib/fitness";

mixin (profiles : Map.Map<Principal, ProfileTypes.UserProfile>) {

  /// Returns all 30 day plans with exercises filtered to the caller's
  /// fitness track (derived from their profile's flexibilityLevel):
  ///   flex 1-2 → #beginner | flex 3 → #intermediate | flex 4-5 → #advanced
  /// Falls back to #intermediate if no profile exists.
  public shared query ({ caller }) func getAllDayPlans() : async [Types.DayPlan] {
    let track = switch (profiles.get(caller)) {
      case (?p) { p.fitnessTrack };
      case null { #intermediate };
    };
    FitnessLib.getAllDaysForTrack(track)
  };

  /// Returns the exercises for a specific day (1–30) filtered to the
  /// caller's fitness track. Returns null when day is out of range.
  /// Falls back to #intermediate if no profile exists.
  public shared query ({ caller }) func getDayPlan(day : Nat) : async ?Types.DayPlan {
    let track = switch (profiles.get(caller)) {
      case (?p) { p.fitnessTrack };
      case null { #intermediate };
    };
    FitnessLib.getDayForTrack(day, track)
  };
};
