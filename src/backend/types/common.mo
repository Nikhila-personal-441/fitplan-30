// ============================================================
// types/common.mo — Cross-cutting shared types
// ============================================================
module {
  /// Timestamp in nanoseconds (from Time.now())
  public type Timestamp = Int;

  /// Calendar date string in "YYYY-MM-DD" format — used as map key
  public type DateKey = Text;

  /// The three fitness tracks that exercises are tagged with.
  /// Derived from user's flexibility level:
  ///   1-2 → #beginner  |  3 → #intermediate  |  4-5 → #advanced
  public type FitnessTrack = {
    #beginner;
    #intermediate;
    #advanced;
  };
};
