// ============================================================
// lib/fitness.mo — Domain logic for the 30-day fitness plan
// ============================================================
import FitnessData    "fitness-data";
import DietLib        "progress-and-diet";
import Types          "../types/fitness";
import Common         "../types/common";

module {

  /// Returns all 30 day plans with meals injected (unfiltered — all exercises).
  /// Kept for backwards compatibility; defaults to showing all difficulty levels.
  public func getAllDays() : [Types.DayPlan] {
    let base = FitnessData.allDays();
    base.map<Types.DayPlan, Types.DayPlan>(func(d) {
      { d with meals = DietLib.getMealsForDay(d.day) }
    })
  };

  /// Returns the DayPlan for a given day number (1–30) with meals.
  /// Returns null if day is out of range.
  /// Kept for backwards compatibility — returns exercises for all tracks.
  public func getDay(dayNumber : Nat) : ?Types.DayPlan {
    let days = getAllDays();
    days.find(func(d : Types.DayPlan) : Bool { d.day == dayNumber })
  };

  /// Filter a day's exercises to only those matching the given fitness track.
  /// Uses the `difficulty` text field ("beginner" | "intermediate" | "advanced").
  public func filterByTrack(
    exercises : [Types.Exercise],
    track     : Common.FitnessTrack,
  ) : [Types.Exercise] {
    let trackLabel = switch (track) {
      case (#beginner)     "beginner";
      case (#intermediate) "intermediate";
      case (#advanced)     "advanced";
    };
    exercises.filter(func(e : Types.Exercise) : Bool { e.difficulty == trackLabel })
  };

  /// Returns all 30 day plans with exercises filtered to the given track,
  /// and meals injected.
  public func getAllDaysForTrack(track : Common.FitnessTrack) : [Types.DayPlan] {
    let days = getAllDays();
    days.map<Types.DayPlan, Types.DayPlan>(func(d) {
      { d with exercises = filterByTrack(d.exercises, track) }
    })
  };

  /// Returns the DayPlan for a given day (1–30) with exercises filtered
  /// to the given track via fitness-data's getExercisesForDay, plus meals.
  /// Returns null if day is out of range.
  public func getDayForTrack(dayNumber : Nat, track : Common.FitnessTrack) : ?Types.DayPlan {
    let exercises = FitnessData.getExercisesForDay(dayNumber, track);
    // If no exercises found for this track, still return the day with empty exercises
    // (day out of range returns [] from getExercisesForDay — distinguish by checking allDays)
    switch (getDay(dayNumber)) {
      case null     { null };
      case (?day)   {
        ?{ day with exercises; meals = DietLib.getMealsForDay(dayNumber) }
      };
    }
  };
};
