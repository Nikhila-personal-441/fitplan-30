// ============================================================
// types/fitness.mo — 30-day fitness plan domain types
//
// ADMIN EDIT GUIDE:
//   To add or change exercises, edit lib/fitness-data.mo.
//   Each Exercise record below is the unit you'll work with.
//   Difficulty options: "beginner" | "intermediate" | "advanced"
//
//   FitnessTrack maps to user's flexibility level:
//     1-2 → #beginner  |  3 → #intermediate  |  4-5 → #advanced
// ============================================================
import Common      "common";
import DietTypes   "progress-and-diet";

module {

  /// A single exercise within a day's routine.
  public type Exercise = {
    name         : Text;
    description  : Text;
    sets         : Nat;
    reps         : Nat;
    durationSec  : Nat;
    instructions : Text;
    difficulty   : Text;  // "beginner" | "intermediate" | "advanced"
  };

  /// One day in the 30-day plan — exercises are filtered at query time
  /// based on the caller's FitnessTrack (matched via difficulty field).
  public type DayPlan = {
    day       : Nat;
    title     : Text;
    focus     : Text;
    exercises : [Exercise];
    meals     : [DietTypes.Meal];  // four meals themed to the workout focus
  };
};
