// ============================================================
// lib/profile.mo — Domain logic for user profile management
// ============================================================
import Map    "mo:core/Map";
import Time   "mo:core/Time";
import Types  "../types/profile";
import Common "../types/common";

module {

  /// State type alias used by caller (main.mo injects this)
  public type ProfileMap = Map.Map<Principal, Types.UserProfile>;

  /// Create a new profile map (called once in main.mo)
  public func emptyMap() : ProfileMap {
    Map.empty<Principal, Types.UserProfile>()
  };

  /// Derive FitnessTrack from flexibility level (1–5).
  ///   1-2 → #beginner  |  3 → #intermediate  |  4-5 → #advanced
  public func trackFromFlex(level : Nat) : Common.FitnessTrack {
    if (level <= 2) { #beginner }
    else if (level == 3) { #intermediate }
    else { #advanced }
  };

  /// Upsert a user profile keyed by principal.
  /// Returns the saved profile.
  public func upsert(
    store   : ProfileMap,
    caller  : Principal,
    input   : Types.ProfileInput,
    now     : Common.Timestamp,
  ) : Types.UserProfile {
    let existing = store.get(caller);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null now;
    };
    let profile : Types.UserProfile = {
      principal           = caller;
      email               = input.email;
      phone               = input.phone;
      age                 = input.age;
      weightKg            = input.weightKg;
      heightCm            = input.heightCm;
      healthIssues        = input.healthIssues;
      flexibilityLevel    = input.flexibilityLevel;
      dietaryRestrictions = input.dietaryRestrictions;
      fitnessTrack        = trackFromFlex(input.flexibilityLevel);
      createdAt           = createdAt;
      updatedAt           = now;
    };
    store.add(caller, profile);
    profile
  };

  /// Look up a profile by principal. Returns null if not found.
  public func get(
    store  : ProfileMap,
    caller : Principal,
  ) : ?Types.UserProfile {
    store.get(caller)
  };

  /// Returns true when a profile exists for the given principal.
  public func hasProfile(
    store  : ProfileMap,
    caller : Principal,
  ) : Bool {
    store.containsKey(caller)
  };
};
