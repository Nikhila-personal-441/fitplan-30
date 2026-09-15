// ============================================================
// types/progress-and-diet.mo — Progress tracking & diet domain types
// ============================================================
import Common "common";

module {

  /// Meal type classification
  public type MealType = {
    #breakfast;
    #lunch;
    #dinner;
    #snack;
  };

  /// Macronutrient breakdown for a meal
  public type Macros = {
    calories  : Nat;  // kcal
    proteinG  : Nat;  // grams of protein
    carbsG    : Nat;  // grams of carbohydrates
    fatG      : Nat;  // grams of fat
  };

  /// A single meal within a day's diet plan
  public type Meal = {
    name         : Text;         // e.g. "Oatmeal with Berries"
    mealType     : MealType;     // breakfast | lunch | dinner | snack
    ingredients  : [Text];       // list of ingredient strings
    macros       : Macros;       // calorie and macro breakdown
    prepTimeMins : Nat;          // preparation time in minutes
    servings     : Nat;          // number of servings
    instructions : [Text];       // step-by-step preparation instructions
  };

  /// User's progress through the 30-day program
  public type UserProgress = {
    principal        : Principal;
    completedDays    : [Nat];                   // array of completed day numbers (1–30)
    lastCompletedDay : ?Nat;                    // most recently completed day, if any
    isDeveloper      : Bool;                    // developer flag — bypasses sequential unlock
    fitnessTrack     : Common.FitnessTrack;     // cached track for quick access
  };
};
