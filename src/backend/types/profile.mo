// ============================================================
// types/profile.mo — User profile domain types
//
// ADMIN EDIT GUIDE:
//   - FlexibilityLevel: 1 = very stiff, 5 = very flexible
//   - fitnessTrack is derived from flexibilityLevel but can be
//     stored explicitly if the user overrides it.
//   - All free-text fields (healthIssues, dietaryRestrictions) accept
//     comma-separated values or plain sentences — no validation enforced
// ============================================================
import Common  "common";

module {

  /// Flexibility on a 1–5 scale:
  ///   1 = barely mobile  2 = stiff  3 = average  4 = flexible  5 = very flexible
  public type FlexibilityLevel = Nat; // valid range: 1..5

  /// Full user profile — collected during onboarding
  public type UserProfile = {
    principal            : Principal;      // Internet Identity principal (auto-set)
    email                : Text;           // e.g. "user@example.com"
    phone                : Text;           // e.g. "+1-555-0100"
    age                  : Nat;            // years
    weightKg             : Float;          // kilograms, e.g. 70.5
    heightCm             : Float;          // centimetres, e.g. 175.0
    healthIssues         : Text;           // free text, e.g. "lower back pain, asthma"
    flexibilityLevel     : FlexibilityLevel; // 1–5
    dietaryRestrictions  : Text;           // free text, e.g. "vegan, no gluten"
    fitnessTrack         : Common.FitnessTrack; // derived or overridden
    createdAt            : Common.Timestamp;
    updatedAt            : Common.Timestamp;
  };

  /// Input record for register / update — same shape minus auto-fields
  public type ProfileInput = {
    email                : Text;
    phone                : Text;
    age                  : Nat;
    weightKg             : Float;
    heightCm             : Float;
    healthIssues         : Text;
    flexibilityLevel     : FlexibilityLevel;
    dietaryRestrictions  : Text;
    // fitnessTrack is auto-derived from flexibilityLevel; not in input
  };
};
