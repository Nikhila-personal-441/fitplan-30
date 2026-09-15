// ============================================================
// mixins/profile-api.mo — Public API for user profile domain
// ============================================================
import Map        "mo:core/Map";
import Time       "mo:core/Time";
import ProfileLib "../lib/profile";
import Types      "../types/profile";

mixin (profiles : Map.Map<Principal, Types.UserProfile>) {

  /// Register or update the calling user's profile.
  /// Must be called before accessing any personalised content.
  public shared ({ caller }) func saveProfile(input : Types.ProfileInput) : async Types.UserProfile {
    let now = Time.now();
    ProfileLib.upsert(profiles, caller, input, now)
  };

  /// Return the profile for the calling principal.
  /// Returns null if the user has not yet completed onboarding.
  public shared query ({ caller }) func getMyProfile() : async ?Types.UserProfile {
    ProfileLib.get(profiles, caller)
  };

  /// Returns true when the calling principal has a saved profile.
  /// Used by the frontend to decide whether to show onboarding.
  public shared query ({ caller }) func hasCompletedOnboarding() : async Bool {
    ProfileLib.hasProfile(profiles, caller)
  };
};
