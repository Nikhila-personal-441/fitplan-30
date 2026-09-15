// ============================================================
// migration.mo — Upgrade migration: add fitnessTrack field
//
// Old state (deployed):
//   profiles    : Map<Principal, UserProfile>  — no fitnessTrack field
//   progressMap : Map<Principal, UserProgress> — no fitnessTrack field
//
// New state:
//   profiles    : Map<Principal, UserProfile>  — adds fitnessTrack
//   progressMap : Map<Principal, UserProgress> — adds fitnessTrack
//   trackingMap : Map<Text, DailyTracking>     — new field, starts empty
// ============================================================
import Map          "mo:core/Map";
import NewProfile   "types/profile";
import NewProgress  "types/progress-and-diet";
import Common       "types/common";
import TrackingTypes "types/tracking";

module {

  // ── Old types (inline — do NOT import from .old/) ─────────

  type OldTimestamp = Int;

  type OldUserProfile = {
    principal           : Principal;
    email               : Text;
    phone               : Text;
    age                 : Nat;
    weightKg            : Float;
    heightCm            : Float;
    healthIssues        : Text;
    flexibilityLevel    : Nat;
    dietaryRestrictions : Text;
    createdAt           : OldTimestamp;
    updatedAt           : OldTimestamp;
  };

  type OldUserProgress = {
    principal        : Principal;
    completedDays    : [Nat];
    lastCompletedDay : ?Nat;
    isDeveloper      : Bool;
  };

  // ── Actor state shapes ────────────────────────────────────

  type OldActor = {
    profiles    : Map.Map<Principal, OldUserProfile>;
    progressMap : Map.Map<Principal, OldUserProgress>;
  };

  type NewActor = {
    profiles    : Map.Map<Principal, NewProfile.UserProfile>;
    progressMap : Map.Map<Principal, NewProgress.UserProgress>;
    trackingMap : Map.Map<Text, TrackingTypes.DailyTracking>;
  };

  // ── Helpers ───────────────────────────────────────────────

  func trackFromFlex(level : Nat) : Common.FitnessTrack {
    if (level <= 2) { #beginner }
    else if (level == 3) { #intermediate }
    else { #advanced }
  };

  // ── Migration function ───────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let profiles = old.profiles.map<Principal, OldUserProfile, NewProfile.UserProfile>(
      func(_k, p) {
        {
          p with
          fitnessTrack = trackFromFlex(p.flexibilityLevel);
        }
      }
    );

    let progressMap = old.progressMap.map<Principal, OldUserProgress, NewProgress.UserProgress>(
      func(_k, prog) {
        {
          prog with
          fitnessTrack = #beginner; // default; refreshed next time user saves profile
        }
      }
    );

    let trackingMap = Map.empty<Text, TrackingTypes.DailyTracking>();

    { profiles; progressMap; trackingMap };
  };
};
