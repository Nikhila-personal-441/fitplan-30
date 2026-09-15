// ============================================================
// mixins/progress-and-diet-api.mo — Public API for progress & diet
// ============================================================
import Debug        "mo:core/Debug";
import Map          "mo:core/Map";
import Types        "../types/progress-and-diet";
import ProfileTypes "../types/profile";
import Lib          "../lib/progress-and-diet";

mixin (
  progressMap : Map.Map<Principal, Types.UserProgress>,
  profiles    : Map.Map<Principal, ProfileTypes.UserProfile>,
) {

  /// Mark the given day (1–30) as completed for the calling user.
  /// Validates sequential unlock rule unless the user is a developer.
  public shared ({ caller }) func markDayComplete(
    day : Nat,
  ) : async { #ok : Text; #err : Text } {
    Debug.todo()
  };

  /// Return the calling user's current progress.
  /// Creates a fresh progress record if the user has none yet.
  public shared query ({ caller }) func getMyProgress() : async Types.UserProgress {
    Debug.todo()
  };

  /// Grant developer mode to the calling user if `code` matches the secret.
  public shared ({ caller }) func setDeveloperMode(
    code : Text,
  ) : async { #ok : Text; #err : Text } {
    Debug.todo()
  };
};
