// ============================================================
// main.mo — Composition root
//
// State is declared here and injected into mixins.
// No business logic lives in this file.
// ============================================================
import Map                "mo:core/Map";
import ProfileTypes       "types/profile";
import DietTypes          "types/progress-and-diet";
import TrackingTypes      "types/tracking";
import ProfileApi         "mixins/profile-api";
import FitnessApi         "mixins/fitness-api";
import ProgressAndDietApi "mixins/progress-and-diet-api";
import TrackingApi        "mixins/tracking-api";
import Migration          "migration";

(with migration = Migration.run)
actor {
  // ── Stable state ──────────────────────────────────────────
  // User profiles keyed by Internet Identity principal
  let profiles    = Map.empty<Principal, ProfileTypes.UserProfile>();

  // User progress keyed by principal
  let progressMap = Map.empty<Principal, DietTypes.UserProgress>();

  // Daily tracking (steps + water) keyed by "<principal>#<YYYY-MM-DD>"
  let trackingMap = Map.empty<Text, TrackingTypes.DailyTracking>();

  // ── Mixin composition ─────────────────────────────────────
  include ProfileApi(profiles);
  include FitnessApi(profiles);
  include ProgressAndDietApi(progressMap, profiles);
  include TrackingApi(trackingMap, profiles);
};
