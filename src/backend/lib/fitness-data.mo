// ============================================================
// lib/fitness-data.mo — 30-day exercise plan (ADMIN EDITABLE)
//
// HOW TO EDIT AS ADMIN:
//   1. Find the day you want to change (search "day = N")
//   2. Edit the Exercise records inside its `exercises` array
//   3. Each Exercise field:
//        name        — short display name
//        description — 1-2 sentence overview
//        sets        — number of sets (set 0 for time-only moves)
//        reps        — reps per set   (set 0 for time-only moves)
//        durationSec — hold/work time in seconds (set 0 for reps-only)
//        instructions — numbered steps as a single string
//        difficulty  — "beginner" | "intermediate" | "advanced"
//   4. Save and redeploy the canister — no DB migration needed.
//
// NOTE: `meals` field is set to [] here. Meals are injected at
//       runtime by lib/fitness.mo calling getMealsForDay().
//
// TRACK MAPPING (derived from user's flexibilityLevel):
//   1-2 → #beginner  |  3 → #intermediate  |  4-5 → #advanced
// ============================================================
import Types  "../types/fitness";
import Common "../types/common";

module {

  /// Returns exercises for a specific day (1–30) filtered to the given track.
  /// Matches exercises by their `difficulty` field:
  ///   #beginner → "beginner" | #intermediate → "intermediate" | #advanced → "advanced"
  /// Returns [] if the day is out of range.
  public func getExercisesForDay(day : Nat, track : Common.FitnessTrack) : [Types.Exercise] {
    let trackLabel = switch (track) {
      case (#beginner)     "beginner";
      case (#intermediate) "intermediate";
      case (#advanced)     "advanced";
    };
    let found = allDays().find(func(d : Types.DayPlan) : Bool { d.day == day });
    switch (found) {
      case null       { [] };
      case (?dayPlan) {
        dayPlan.exercises.filter(func(e : Types.Exercise) : Bool { e.difficulty == trackLabel })
      };
    }
  };

  /// Returns the complete 30-day plan as an immutable array.
  /// Called by the fitness mixin — never stores state.
  public func allDays() : [Types.DayPlan] {
    [
      // ----------------------------------------------------------
      // WEEK 1 — Foundation & Activation
      // ----------------------------------------------------------
      {
        day = 1;
        title = "Day 1 – Full Body Warm-Up";
        focus = "Mobility & Activation";
        exercises = [
          {
            name        = "Jumping Jacks";
            description = "Classic full-body cardio warm-up that raises heart rate and loosens joints.";
            sets = 3; reps = 20; durationSec = 0;
            instructions = "1. Stand with feet together. 2. Jump feet apart while raising arms overhead. 3. Return to start. Repeat.";
            difficulty = "beginner";
          },
          {
            name        = "Arm Circles";
            description = "Shoulder mobility drill to warm up the rotator cuffs.";
            sets = 2; reps = 15; durationSec = 0;
            instructions = "1. Extend arms to sides. 2. Make small forward circles for 15 reps. 3. Reverse direction for 15 reps.";
            difficulty = "beginner";
          },
          {
            name        = "Hip Circles";
            description = "Loosens the hip flexors and lower back before more demanding work.";
            sets = 2; reps = 10; durationSec = 0;
            instructions = "1. Stand with feet shoulder-width apart, hands on hips. 2. Rotate hips in a large circle clockwise. 3. Reverse.";
            difficulty = "beginner";
          },
          {
            name        = "Cat-Cow Stretch";
            description = "Spinal mobility sequence performed on all fours.";
            sets = 2; reps = 10; durationSec = 0;
            instructions = "1. Start on hands and knees. 2. Inhale, drop belly, lift gaze (Cow). 3. Exhale, round spine toward ceiling (Cat). Alternate.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 2;
        title = "Day 2 – Core Basics";
        focus = "Core Strength";
        exercises = [
          {
            name        = "Plank Hold";
            description = "Foundational isometric hold that builds core and shoulder stability.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. Forearms on floor, elbows under shoulders. 2. Body in a straight line heel to head. 3. Hold, breathe steadily.";
            difficulty = "beginner";
          },
          {
            name        = "Crunches";
            description = "Targets the rectus abdominis (front abs).";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Lie on back, knees bent. 2. Hands behind head, elbows out. 3. Curl shoulders toward knees. Lower slowly.";
            difficulty = "beginner";
          },
          {
            name        = "Leg Raises";
            description = "Works the lower abdominals and hip flexors.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie flat, legs straight. 2. Raise legs to 90°. 3. Lower slowly without touching the floor. Repeat.";
            difficulty = "beginner";
          },
          {
            name        = "Bird Dog";
            description = "Anti-rotation core stability exercise that also challenges balance.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. On all fours. 2. Extend right arm and left leg simultaneously. 3. Hold 2 s. 4. Return and switch sides. That is 1 rep.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 3;
        title = "Day 3 – Lower Body";
        focus = "Legs & Glutes";
        exercises = [
          {
            name        = "Bodyweight Squats";
            description = "Compound lower-body movement targeting quads, glutes, and hamstrings.";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Feet shoulder-width apart, toes slightly out. 2. Lower until thighs parallel to floor. 3. Drive through heels to stand.";
            difficulty = "beginner";
          },
          {
            name        = "Reverse Lunges";
            description = "Single-leg strength move that reduces knee strain compared to forward lunges.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Stand tall. 2. Step one foot back, lower back knee toward floor. 3. Front thigh parallel to floor. 4. Return to start. Alternate legs.";
            difficulty = "beginner";
          },
          {
            name        = "Glute Bridges";
            description = "Activates the glutes and hamstrings while protecting the lower back.";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Lie on back, knees bent. 2. Drive hips up until body forms a straight line. 3. Squeeze glutes at top. Lower slowly.";
            difficulty = "beginner";
          },
          {
            name        = "Calf Raises";
            description = "Isolates and strengthens the calf muscles.";
            sets = 3; reps = 20; durationSec = 0;
            instructions = "1. Stand with feet hip-width. 2. Rise onto toes as high as possible. 3. Lower slowly. Use a wall for balance if needed.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 4;
        title = "Day 4 – Upper Body Push";
        focus = "Chest, Shoulders & Triceps";
        exercises = [
          {
            name        = "Push-Ups";
            description = "Classic bodyweight push movement targeting chest, shoulders, and triceps.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Hands slightly wider than shoulders. 2. Body straight from head to heels. 3. Lower chest to floor. 4. Press back up.";
            difficulty = "beginner";
          },
          {
            name        = "Pike Push-Ups";
            description = "Shifts load to the shoulders — a progression toward handstand push-ups.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Inverted-V position (hips high). 2. Bend elbows to lower head toward floor. 3. Press back up.";
            difficulty = "intermediate";
          },
          {
            name        = "Tricep Dips (Chair)";
            description = "Targets triceps using a chair or low surface.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Hands on chair edge, fingers forward. 2. Slide off edge, legs straight. 3. Lower until elbows at 90°. Press up.";
            difficulty = "beginner";
          },
          {
            name        = "Shoulder Taps";
            description = "Core stability and shoulder endurance drill from a plank position.";
            sets = 3; reps = 20; durationSec = 0;
            instructions = "1. High plank position. 2. Tap right hand to left shoulder. 3. Return. 4. Tap left to right. 2 taps = 1 rep. Keep hips still.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 5;
        title = "Day 5 – Cardio Blast";
        focus = "Cardiovascular Endurance";
        exercises = [
          {
            name        = "High Knees";
            description = "Running in place with exaggerated knee drive — elevates heart rate fast.";
            sets = 4; reps = 0; durationSec = 30;
            instructions = "1. Jog in place. 2. Drive knees up to hip height alternately. 3. Pump arms in opposition. Keep upright posture.";
            difficulty = "beginner";
          },
          {
            name        = "Burpees";
            description = "Total-body cardio + strength combination — one of the most effective calorie burners.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Stand. 2. Squat, place hands on floor. 3. Jump feet back to plank. 4. Push-up (optional). 5. Jump feet forward. 6. Jump up, clap overhead.";
            difficulty = "intermediate";
          },
          {
            name        = "Mountain Climbers";
            description = "Dynamic plank variation that challenges core and cardiovascular system.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. High plank. 2. Drive right knee toward chest. 3. Switch legs rapidly. Alternate continuously.";
            difficulty = "beginner";
          },
          {
            name        = "Jump Squats";
            description = "Plyometric lower-body move that adds power to standard squats.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Squat to parallel. 2. Explode upward, leaving the floor. 3. Land softly with knees slightly bent. Immediately squat again.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 6;
        title = "Day 6 – Upper Body Pull";
        focus = "Back & Biceps";
        exercises = [
          {
            name        = "Superman Hold";
            description = "Strengthens the posterior chain (lower and mid back) without equipment.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie face down, arms extended overhead. 2. Simultaneously lift arms, chest, and legs off floor. 3. Hold 2 s. Lower.";
            difficulty = "beginner";
          },
          {
            name        = "Resistance Band Row (or Towel Row)";
            description = "Horizontal pull targeting lats and rhomboids.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Anchor band/towel at waist height. 2. Hold ends, lean back slightly. 3. Pull elbows back past torso. 4. Slowly extend arms.";
            difficulty = "beginner";
          },
          {
            name        = "Doorframe Bicep Curl";
            description = "Bodyweight bicep activation using a doorframe or pole as anchor.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Grip doorframe at hip height. 2. Lean back slightly, arms straight. 3. Curl body toward frame by bending elbows. 4. Lower.";
            difficulty = "beginner";
          },
          {
            name        = "Prone Y-T-W";
            description = "Scapular stabilisation series that corrects posture and prevents shoulder injury.";
            sets = 2; reps = 8; durationSec = 0;
            instructions = "1. Lie face down. 2. Raise arms into Y shape (overhead, thumbs up). Hold 2 s. 3. Move to T (arms out). Hold. 4. Bend to W. Hold. Each shape = 1 rep.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 7;
        title = "Day 7 – Active Recovery";
        focus = "Flexibility & Breathing";
        exercises = [
          {
            name        = "Child's Pose";
            description = "Gentle resting stretch for the hips, back, and shoulders.";
            sets = 1; reps = 0; durationSec = 60;
            instructions = "1. Kneel, big toes touching. 2. Sit back on heels. 3. Walk hands forward, rest forehead on floor. 4. Breathe deeply.";
            difficulty = "beginner";
          },
          {
            name        = "Seated Forward Fold";
            description = "Hamstring and lower back stretch performed seated.";
            sets = 2; reps = 0; durationSec = 30;
            instructions = "1. Sit with legs extended. 2. Reach hands toward feet, hinging at hips. 3. Hold without bouncing. Breathe.";
            difficulty = "beginner";
          },
          {
            name        = "Pigeon Pose";
            description = "Deep hip flexor and glute opener.";
            sets = 2; reps = 0; durationSec = 40;
            instructions = "1. From plank, bring right knee forward behind right wrist. 2. Extend left leg back. 3. Lower torso over front leg. Hold. Switch sides.";
            difficulty = "beginner";
          },
          {
            name        = "Diaphragmatic Breathing";
            description = "Activates the parasympathetic nervous system to accelerate recovery.";
            sets = 1; reps = 10; durationSec = 0;
            instructions = "1. Lie on back, one hand on chest one on belly. 2. Inhale 4 s through nose — belly rises, chest stays still. 3. Exhale 6 s through mouth. 10 cycles.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },

      // ----------------------------------------------------------
      // WEEK 2 — Building Strength
      // ----------------------------------------------------------
      {
        day = 8;
        title = "Day 8 – Core Progression";
        focus = "Core Strength";
        exercises = [
          {
            name        = "Plank Hold";
            description = "Increase hold time from Week 1.";
            sets = 3; reps = 0; durationSec = 45;
            instructions = "1. Forearms on floor. 2. Body straight. 3. Hold and breathe.";
            difficulty = "beginner";
          },
          {
            name        = "Russian Twists";
            description = "Rotational core exercise targeting the obliques.";
            sets = 3; reps = 20; durationSec = 0;
            instructions = "1. Sit, knees bent, heels lifted. 2. Clasp hands or hold weight. 3. Twist torso left, then right. That is 1 rep.";
            difficulty = "intermediate";
          },
          {
            name        = "Hollow Body Hold";
            description = "Advanced isometric core exercise used in gymnastics.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. Lie on back, arms overhead. 2. Press lower back to floor. 3. Lift arms, head, and legs slightly. 4. Hold.";
            difficulty = "intermediate";
          },
          {
            name        = "Dead Bug";
            description = "Anti-extension core stability with contralateral coordination.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Lie on back, arms up, knees at 90°. 2. Lower right arm and left leg toward floor simultaneously. 3. Return. 4. Switch. 2 moves = 1 rep.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 9;
        title = "Day 9 – Lower Body Strength";
        focus = "Legs & Power";
        exercises = [
          {
            name        = "Bulgarian Split Squat";
            description = "Single-leg squat with rear foot elevated — intense quad and glute builder.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Stand a stride away from a chair. 2. Place one foot behind on chair. 3. Lower front leg to 90°. 4. Press up. Complete reps, then switch legs.";
            difficulty = "intermediate";
          },
          {
            name        = "Sumo Squat";
            description = "Wide-stance squat with emphasis on inner thighs and glutes.";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Feet wider than shoulder-width, toes pointed out 45°. 2. Lower until thighs parallel. 3. Drive through heels to stand.";
            difficulty = "beginner";
          },
          {
            name        = "Single-Leg Glute Bridge";
            description = "Unilateral glute activation that corrects imbalances.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie on back, one knee bent. 2. Extend the other leg straight. 3. Drive hips up using bent leg. 4. Lower slowly. Switch sides.";
            difficulty = "intermediate";
          },
          {
            name        = "Wall Sit";
            description = "Isometric quad endurance exercise.";
            sets = 3; reps = 0; durationSec = 45;
            instructions = "1. Back flat against wall. 2. Slide down until thighs parallel to floor. 3. Hold the position. 4. Slide back up to rest.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 10;
        title = "Day 10 – Cardio & Agility";
        focus = "Speed & Coordination";
        exercises = [
          {
            name        = "Speed Skaters";
            description = "Lateral plyometric move that builds agility and burns calories.";
            sets = 4; reps = 0; durationSec = 30;
            instructions = "1. Leap to the right, landing on right foot. 2. Swing left leg behind. 3. Leap left. 4. Alternate rapidly.";
            difficulty = "intermediate";
          },
          {
            name        = "Box Jumps (or Stair Jumps)";
            description = "Explosive power builder using a low box or stair.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Stand in front of box/stair. 2. Bend knees, swing arms, and jump onto surface. 3. Land softly. 4. Step back down. Repeat.";
            difficulty = "intermediate";
          },
          {
            name        = "Squat Jumps";
            description = "Plyometric lower body power exercise.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Squat to parallel. 2. Explode up. 3. Land softly with knees bent. Immediately go into next rep.";
            difficulty = "intermediate";
          },
          {
            name        = "Butt Kicks";
            description = "Running drill that activates hamstrings and raises heart rate.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. Jog in place. 2. Kick heels up toward glutes with each stride. 3. Keep torso upright. Pump arms.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 11;
        title = "Day 11 – Upper Body Strength";
        focus = "Push & Pull Superset";
        exercises = [
          {
            name        = "Wide Push-Ups";
            description = "Wider grip shifts emphasis to the chest outer fibres.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Place hands wider than shoulder-width. 2. Lower chest to floor. 3. Press back up. Keep body straight.";
            difficulty = "intermediate";
          },
          {
            name        = "Diamond Push-Ups";
            description = "Close-grip push-up that maximally loads the triceps.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Place hands close together forming a diamond. 2. Lower chest to hands. 3. Press up. Keep elbows tracking back, not flaring.";
            difficulty = "intermediate";
          },
          {
            name        = "Inverted Row (Table Row)";
            description = "Horizontal pull using a table edge — no equipment needed.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Lie under a sturdy table. 2. Grip the edge, body straight. 3. Pull chest up to table. 4. Lower slowly.";
            difficulty = "intermediate";
          },
          {
            name        = "Side Lateral Raise (Band or Water Bottles)";
            description = "Isolates the medial deltoid for shoulder width.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Hold light weights/bottles at sides. 2. Raise arms to shoulder height. 3. Lower slowly. Keep slight bend in elbows.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 12;
        title = "Day 12 – Full Body Circuit";
        focus = "Endurance & Conditioning";
        exercises = [
          {
            name        = "Burpees";
            description = "Full-body cardio + strength move — foundational circuit exercise.";
            sets = 4; reps = 10; durationSec = 0;
            instructions = "1. Stand. 2. Squat, place hands on floor. 3. Jump feet back to plank. 4. Push-up. 5. Jump feet forward. 6. Jump up overhead.";
            difficulty = "intermediate";
          },
          {
            name        = "Push-Up to T";
            description = "Combines push-up with a lateral rotation for core challenge.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Do a push-up. 2. At the top, rotate into a side plank (T-shape). 3. Return to plank. 4. Alternate rotation side each rep.";
            difficulty = "intermediate";
          },
          {
            name        = "Jump Lunges";
            description = "Plyometric lunge that builds leg power and cardiovascular endurance.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lunge forward with right leg. 2. Jump and switch legs mid-air. 3. Land in lunge with left leg forward. Alternate. 2 lunges = 1 rep.";
            difficulty = "advanced";
          },
          {
            name        = "Plank to Downward Dog";
            description = "Dynamic core + hamstring stretch flow.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Start in plank. 2. Push hips up and back into Downward Dog (inverted V). 3. Return to plank. 1 cycle = 1 rep.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 13;
        title = "Day 13 – Core & Balance";
        focus = "Stability & Proprioception";
        exercises = [
          {
            name        = "Single-Leg Balance Hold";
            description = "Improves ankle stability and proprioception.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. Stand on one leg. 2. Lift other knee to hip height. 3. Hold, eyes closed for added challenge. Switch legs.";
            difficulty = "beginner";
          },
          {
            name        = "Plank with Leg Lift";
            description = "Adds posterior chain activation to a standard plank.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Forearm plank. 2. Lift right leg 6 inches. Hold 2 s. 3. Lower. 4. Lift left. 2 lifts = 1 rep. Keep hips level.";
            difficulty = "intermediate";
          },
          {
            name        = "Side Plank";
            description = "Lateral core stability targeting obliques and hip abductors.";
            sets = 3; reps = 0; durationSec = 25;
            instructions = "1. Lie on side, forearm on floor. 2. Lift hips to form a straight line. 3. Hold. Switch sides for next set.";
            difficulty = "intermediate";
          },
          {
            name        = "Pallof Press (Band or Towel)";
            description = "Anti-rotation core press that builds rotational resistance.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Anchor band at chest height, stand sideways. 2. Hold with both hands at chest. 3. Press straight out. 4. Pull back. That is 1 rep. Switch sides.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 14;
        title = "Day 14 – Active Recovery";
        focus = "Yoga & Mobility";
        exercises = [
          {
            name        = "Sun Salutation A (Half)";
            description = "Gentle yoga flow connecting breath to movement.";
            sets = 3; reps = 1; durationSec = 0;
            instructions = "1. Mountain pose. 2. Reach arms up. 3. Fold forward. 4. Half lift. 5. Forward fold. 6. Mountain pose. Flow slowly with breath.";
            difficulty = "beginner";
          },
          {
            name        = "Lizard Pose";
            description = "Deep hip flexor and groin stretch.";
            sets = 2; reps = 0; durationSec = 45;
            instructions = "1. From lunge, place both hands inside front foot. 2. Lower hips toward floor. 3. Hold and breathe. Switch sides.";
            difficulty = "beginner";
          },
          {
            name        = "Thoracic Spine Rotation";
            description = "Unlocks the mid-back, essential for posture and overhead mobility.";
            sets = 2; reps = 10; durationSec = 0;
            instructions = "1. Side-lying, knees bent 90°. 2. Extend top arm and rotate it open to ceiling. 3. Return. 10 reps each side.";
            difficulty = "beginner";
          },
          {
            name        = "Legs-Up-The-Wall";
            description = "Restorative inversion that drains lactic acid from legs.";
            sets = 1; reps = 0; durationSec = 120;
            instructions = "1. Sit sideways against wall. 2. Swing legs up wall as you lie back. 3. Relax arms at sides. 4. Breathe and rest.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },

      // ----------------------------------------------------------
      // WEEK 3 — Intensity Ramp
      // ----------------------------------------------------------
      {
        day = 15;
        title = "Day 15 – HIIT Cardio";
        focus = "High Intensity Interval Training";
        exercises = [
          {
            name        = "Burpee Box Jump";
            description = "Combines burpee with a jump onto a box — maximal metabolic demand.";
            sets = 4; reps = 8; durationSec = 0;
            instructions = "1. Perform burpee. 2. Instead of jumping straight up, jump onto a box/stair. 3. Step down. Immediately repeat.";
            difficulty = "advanced";
          },
          {
            name        = "Tuck Jumps";
            description = "Explosive jump driving knees to chest — plyometric power.";
            sets = 4; reps = 10; durationSec = 0;
            instructions = "1. Stand with feet hip-width. 2. Bend knees, swing arms. 3. Jump explosively, pulling knees to chest. 4. Land softly. Reset.";
            difficulty = "advanced";
          },
          {
            name        = "Mountain Climbers (Fast)";
            description = "Increase speed from earlier version for higher heart rate.";
            sets = 4; reps = 0; durationSec = 40;
            instructions = "1. High plank. 2. Drive knees to chest as fast as possible. 3. Keep hips low, core tight.";
            difficulty = "intermediate";
          },
          {
            name        = "Plank Jacks";
            description = "Plank variation with jumping jack leg movement — cardio + core.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. High plank. 2. Jump feet wide. 3. Jump feet together. Repeat rapidly.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 16;
        title = "Day 16 – Lower Body Power";
        focus = "Explosive Legs";
        exercises = [
          {
            name        = "Pistol Squat Progression";
            description = "Single-leg squat — do assisted version (holding a pole) if needed.";
            sets = 3; reps = 8; durationSec = 0;
            instructions = "1. Stand on right leg. 2. Extend left leg forward. 3. Lower slowly on right leg as far as comfortable. 4. Press back up. Switch.";
            difficulty = "advanced";
          },
          {
            name        = "Jump Lunges";
            description = "Plyometric alternating lunge for lower body power.";
            sets = 4; reps = 12; durationSec = 0;
            instructions = "1. Lunge forward. 2. Jump and switch legs. 3. Land in opposite lunge. Alternate continuously. 2 = 1 rep.";
            difficulty = "advanced";
          },
          {
            name        = "Lateral Squat";
            description = "Targets inner thighs and lateral movement patterns.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Wide stance. 2. Shift weight to right, bending right knee while left remains straight. 3. Return centre. 4. Shift left. Each side = 1 rep.";
            difficulty = "intermediate";
          },
          {
            name        = "Nordic Hamstring Curl";
            description = "Eccentric hamstring strengthener — requires anchoring feet.";
            sets = 3; reps = 8; durationSec = 0;
            instructions = "1. Kneel, feet anchored under sofa/partner. 2. Slowly lower torso toward floor using hamstrings. 3. Catch with hands. 4. Use hands to push back up.";
            difficulty = "advanced";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 17;
        title = "Day 17 – Push Strength";
        focus = "Chest, Shoulders, Triceps";
        exercises = [
          {
            name        = "Decline Push-Ups";
            description = "Feet elevated to shift load to upper chest and anterior deltoids.";
            sets = 4; reps = 12; durationSec = 0;
            instructions = "1. Place feet on chair/stair. 2. Hands shoulder-width on floor. 3. Lower chest to floor. 4. Press up. Body straight.";
            difficulty = "intermediate";
          },
          {
            name        = "Pike Push-Up (Elevated)";
            description = "Feet on chair increases the shoulder loading.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Feet on chair, hands on floor, hips high. 2. Lower head between hands. 3. Press back up. Vertical movement pattern.";
            difficulty = "advanced";
          },
          {
            name        = "Tricep Push-Ups";
            description = "Narrow stance push-up maximising tricep recruitment.";
            sets = 4; reps = 12; durationSec = 0;
            instructions = "1. Hands directly under shoulders, elbows tight to body. 2. Lower chest, elbows pointing back. 3. Press up.";
            difficulty = "intermediate";
          },
          {
            name        = "Hindu Push-Ups";
            description = "Dynamic push-up that combines shoulder, chest, and hip flexor work.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Downward Dog position. 2. Dive head between hands while pushing forward. 3. Rise into Upward Dog. 4. Push hips back to start.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 18;
        title = "Day 18 – Pull Strength";
        focus = "Back, Biceps, Rear Delts";
        exercises = [
          {
            name        = "Chin-Ups (or Assisted)";
            description = "Supinated pull-up for biceps and lat development.";
            sets = 3; reps = 8; durationSec = 0;
            instructions = "1. Hang from bar, palms facing you. 2. Pull chin over bar. 3. Lower slowly. Use a resistance band looped around bar for assistance if needed.";
            difficulty = "intermediate";
          },
          {
            name        = "Band Pull-Apart";
            description = "Targets rear deltoids and improves posture.";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Hold band in front at shoulder height. 2. Pull band apart horizontally until arms are wide. 3. Slowly return. Keep arms straight.";
            difficulty = "beginner";
          },
          {
            name        = "Superman with Reach";
            description = "Extends Superman hold with arm reach for added range of motion.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie face down. 2. Lift chest. 3. Reach arms forward (Y) then sweep to sides (T). 4. Lower. Y to T sweep = 1 rep.";
            difficulty = "beginner";
          },
          {
            name        = "Face Pull (Band)";
            description = "External rotation pull that protects shoulders and builds rear delts.";
            sets = 3; reps = 15; durationSec = 0;
            instructions = "1. Anchor band at face height. 2. Pull handles to face, elbows at 90°. 3. Squeeze rear delts. 4. Slowly extend.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 19;
        title = "Day 19 – Core Advanced";
        focus = "Anti-Rotation & Stability";
        exercises = [
          {
            name        = "Dragon Flag Progression";
            description = "Advanced core exercise. Start with bent knees.";
            sets = 3; reps = 6; durationSec = 0;
            instructions = "1. Lie on bench/floor, grip overhead. 2. Lift legs and hips as one unit. 3. Lower slowly, keeping body straight. 4. Stop before touching floor.";
            difficulty = "advanced";
          },
          {
            name        = "L-Sit Hold (on floor)";
            description = "Isometric compression core hold.";
            sets = 3; reps = 0; durationSec = 15;
            instructions = "1. Sit on floor, palms pressed down beside hips. 2. Straighten legs and lift them off floor. 3. Hold. Tuck knees if needed.";
            difficulty = "advanced";
          },
          {
            name        = "Windshield Wipers";
            description = "Rotational abs and oblique exercise.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Lie on back, arms out, legs at 90°. 2. Lower legs slowly to the right without touching floor. 3. Return to centre. 4. Go left. Each side = 1 rep.";
            difficulty = "advanced";
          },
          {
            name        = "Bear Crawl";
            description = "Quadrupedal locomotion that challenges total body coordination and core.";
            sets = 3; reps = 0; durationSec = 30;
            instructions = "1. On all fours, knees 2 inches off floor. 2. Move right hand and left foot forward simultaneously. 3. Then left hand, right foot. Continue forward and back.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 20;
        title = "Day 20 – Full Body HIIT";
        focus = "Maximum Conditioning";
        exercises = [
          {
            name        = "Tabata Burpees";
            description = "20 s work / 10 s rest × 8 rounds — maximum effort.";
            sets = 8; reps = 0; durationSec = 20;
            instructions = "1. Perform burpees as fast as possible for 20 s. 2. Rest 10 s. 3. Repeat 8 rounds total.";
            difficulty = "advanced";
          },
          {
            name        = "Tabata Squats";
            description = "20 s work / 10 s rest × 8 rounds of air squats.";
            sets = 8; reps = 0; durationSec = 20;
            instructions = "1. Air squat for 20 s as many reps as possible. 2. Rest 10 s. 3. Repeat 8 rounds.";
            difficulty = "intermediate";
          },
          {
            name        = "Tabata Push-Ups";
            description = "20 s work / 10 s rest × 8 rounds of push-ups.";
            sets = 8; reps = 0; durationSec = 20;
            instructions = "1. Push-ups for 20 s. 2. Rest 10 s. 3. Repeat 8 rounds.";
            difficulty = "intermediate";
          },
          {
            name        = "Tabata Mountain Climbers";
            description = "20 s work / 10 s rest × 8 rounds.";
            sets = 8; reps = 0; durationSec = 20;
            instructions = "1. Mountain climbers for 20 s. 2. Rest 10 s. 3. Repeat 8 rounds.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 21;
        title = "Day 21 – Active Recovery";
        focus = "Foam Roll & Stretch";
        exercises = [
          {
            name        = "Foam Roll Quads";
            description = "Self-myofascial release of the quadriceps.";
            sets = 1; reps = 0; durationSec = 60;
            instructions = "1. Lie face down, foam roller under thighs. 2. Roll from hip to knee slowly. 3. Pause on tender spots 5–10 s. Repeat each leg.";
            difficulty = "beginner";
          },
          {
            name        = "Foam Roll IT Band";
            description = "Releases lateral leg tightness.";
            sets = 1; reps = 0; durationSec = 60;
            instructions = "1. Side-lying, roller under outer thigh. 2. Roll from hip to knee. 3. Pause on knots. Each side.";
            difficulty = "beginner";
          },
          {
            name        = "Figure Four Stretch";
            description = "Piriformis and glute stretch.";
            sets = 2; reps = 0; durationSec = 40;
            instructions = "1. Lie on back. 2. Cross right ankle over left knee. 3. Pull left thigh toward chest. 4. Hold. Switch.";
            difficulty = "beginner";
          },
          {
            name        = "Wall Chest Stretch";
            description = "Opens the anterior shoulder and pec major.";
            sets = 2; reps = 0; durationSec = 30;
            instructions = "1. Place right hand on wall at shoulder height. 2. Rotate body left until stretch is felt in chest. 3. Hold. Switch.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },

      // ----------------------------------------------------------
      // WEEK 4 — Peak Performance
      // ----------------------------------------------------------
      {
        day = 22;
        title = "Day 22 – Strength Superset";
        focus = "Total Body Strength";
        exercises = [
          {
            name        = "Push-Up Superset (Wide / Regular / Diamond)";
            description = "Three push-up variations back-to-back with no rest — hits all chest fibres.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Do 10 wide push-ups. 2. Immediately 10 regular. 3. Immediately 10 diamond. That is 1 set. Rest 90 s between sets.";
            difficulty = "advanced";
          },
          {
            name        = "Squat to Reverse Lunge";
            description = "Combines squat and lunge in one fluid movement.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Squat. 2. As you stand, step right foot back into reverse lunge. 3. Return. 4. Squat. 5. Lunge with left. 2 lunges = 1 rep.";
            difficulty = "intermediate";
          },
          {
            name        = "Superman Pull";
            description = "Superman position with simulated lat pull-down motion.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie face down, arms extended. 2. Lift chest. 3. Pull elbows back (lat pull motion). 4. Extend arms. 5. Lower. 1 pull = 1 rep.";
            difficulty = "intermediate";
          },
          {
            name        = "V-Ups";
            description = "Full-range abs exercise combining leg and torso raise.";
            sets = 3; reps = 12; durationSec = 0;
            instructions = "1. Lie flat, arms overhead. 2. Simultaneously raise legs and torso. 3. Reach hands to feet at the top (V shape). 4. Lower slowly.";
            difficulty = "advanced";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 23;
        title = "Day 23 – Cardio Endurance";
        focus = "Sustained Effort";
        exercises = [
          {
            name        = "Continuous Jump Rope (simulated)";
            description = "Simulate jump rope by bouncing on toes and circling wrists.";
            sets = 1; reps = 0; durationSec = 300;
            instructions = "1. Bounce lightly on balls of feet. 2. Circle wrists as if holding a rope. 3. Maintain for 5 minutes continuous.";
            difficulty = "beginner";
          },
          {
            name        = "Stair Climbing";
            description = "Uses a staircase or step for sustained leg cardio.";
            sets = 1; reps = 0; durationSec = 300;
            instructions = "1. Walk briskly up and down stairs for 5 minutes. 2. Increase speed for intervals of 30 s every 1 minute.";
            difficulty = "beginner";
          },
          {
            name        = "Walking Lunges";
            description = "Continuous lunges covering distance — endurance-focused.";
            sets = 3; reps = 20; durationSec = 0;
            instructions = "1. Step forward into lunge. 2. Bring back foot forward into next lunge. 3. Continue across a room. 20 total lunges per set.";
            difficulty = "intermediate";
          },
          {
            name        = "Inchworm";
            description = "Full-body warm-down that combines hamstring stretch and push-up.";
            sets = 3; reps = 8; durationSec = 0;
            instructions = "1. Stand, fold forward, walk hands to plank. 2. Do a push-up. 3. Walk hands back to feet. 4. Stand. 1 cycle = 1 rep.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 24;
        title = "Day 24 – Core Final";
        focus = "Max Core Challenge";
        exercises = [
          {
            name        = "Plank Hold";
            description = "Maximum duration attempt.";
            sets = 3; reps = 0; durationSec = 60;
            instructions = "1. Forearm plank. 2. Hold as long as possible targeting 60 s. 3. Rest 60 s between sets.";
            difficulty = "intermediate";
          },
          {
            name        = "Ab Wheel Rollout (or Towel Slide)";
            description = "Extreme anti-extension core movement.";
            sets = 3; reps = 8; durationSec = 0;
            instructions = "1. Kneel, hands on ab wheel or towel on smooth floor. 2. Roll forward as far as possible. 3. Pull back using abs. Keep back straight.";
            difficulty = "advanced";
          },
          {
            name        = "Toes to Bar (or Toes to Bench)";
            description = "Hip flexion core exercise — hang from bar or use bench for leg raise.";
            sets = 3; reps = 10; durationSec = 0;
            instructions = "1. Hang from pull-up bar. 2. Raise straight legs until toes touch bar. 3. Lower slowly. Modify: raise bent knees to chest.";
            difficulty = "advanced";
          },
          {
            name        = "Plank Complex (Forward / Side L / Side R)";
            description = "Three plank positions back-to-back as one set.";
            sets = 3; reps = 1; durationSec = 0;
            instructions = "1. Front plank 30 s. 2. Rotate to left side plank 20 s. 3. Rotate to right side plank 20 s. No rest between positions. Rest 90 s between sets.";
            difficulty = "advanced";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 25;
        title = "Day 25 – Lower Body Burnout";
        focus = "Legs Max Effort";
        exercises = [
          {
            name        = "100 Air Squats";
            description = "Muscular endurance challenge for the legs.";
            sets = 1; reps = 100; durationSec = 0;
            instructions = "1. Perform 100 air squats as fast as possible. 2. Rest as needed but track total time. 3. Goal: complete within 5 minutes.";
            difficulty = "intermediate";
          },
          {
            name        = "Wall Sit Burnout";
            description = "Hold until failure.";
            sets = 3; reps = 0; durationSec = 60;
            instructions = "1. Slide down to 90°. 2. Hold as long as possible (target 60 s). 3. Note your hold time each round.";
            difficulty = "intermediate";
          },
          {
            name        = "Speed Squats";
            description = "High-velocity squats for metabolic stress.";
            sets = 4; reps = 0; durationSec = 30;
            instructions = "1. Squat as fast as possible for 30 s. 2. Maintain full depth. 3. Count reps per round and try to beat each round.";
            difficulty = "intermediate";
          },
          {
            name        = "Calf Raise Burnout";
            description = "Maximum reps in one set.";
            sets = 3; reps = 0; durationSec = 60;
            instructions = "1. Rise on toes as fast as possible for 60 s. 2. Rest 45 s. 3. Repeat.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 26;
        title = "Day 26 – Upper Body Burnout";
        focus = "Push & Pull Max Effort";
        exercises = [
          {
            name        = "Max Push-Ups";
            description = "As many push-ups as possible in one set.";
            sets = 3; reps = 0; durationSec = 60;
            instructions = "1. Do as many push-ups as possible in 60 s. 2. Record number. 3. Rest 90 s. 3 total rounds.";
            difficulty = "intermediate";
          },
          {
            name        = "Inverted Row Burnout";
            description = "As many rows as possible under a table.";
            sets = 3; reps = 0; durationSec = 60;
            instructions = "1. Lie under table, grip edge. 2. Body straight, heels on floor. 3. Pull chest to table as many times as possible in 60 s.";
            difficulty = "intermediate";
          },
          {
            name        = "Pike Push-Up to Regular Push-Up Ladder";
            description = "Descending ladder combining two push-up types.";
            sets = 1; reps = 10; durationSec = 0;
            instructions = "1. Do 10 pike push-ups then 10 regular. 2. Then 8 + 8. 3. 6+6. 4. 4+4. 5. 2+2. No rest within the ladder.";
            difficulty = "advanced";
          },
          {
            name        = "Band Pull-Apart Burnout";
            description = "High-rep shoulder health and rear delt work.";
            sets = 3; reps = 25; durationSec = 0;
            instructions = "1. Hold band at shoulder height. 2. Pull apart maximally. 3. Return. 25 reps fast. Rest 45 s.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 27;
        title = "Day 27 – Full Body Power";
        focus = "Speed & Power Combination";
        exercises = [
          {
            name        = "Clapping Push-Ups";
            description = "Plyometric push-up for explosive upper-body power.";
            sets = 4; reps = 8; durationSec = 0;
            instructions = "1. Do a push-up with enough force to lift hands off floor. 2. Clap mid-air. 3. Land softly, immediately go into next rep.";
            difficulty = "advanced";
          },
          {
            name        = "Broad Jump";
            description = "Horizontal plyometric jump measuring lower body power.";
            sets = 4; reps = 6; durationSec = 0;
            instructions = "1. Feet hip-width. 2. Load into quarter-squat. 3. Jump forward as far as possible. 4. Land softly with knees bent. Walk back to start.";
            difficulty = "intermediate";
          },
          {
            name        = "Explosive Mountain Climbers";
            description = "Each drive of the knee has a small explosive kick.";
            sets = 4; reps = 0; durationSec = 30;
            instructions = "1. High plank. 2. Drive knee powerfully to chest, extending other leg back with a kick. 3. Alternate as fast as possible.";
            difficulty = "advanced";
          },
          {
            name        = "Medicine Ball Slam (or Pillow Slam)";
            description = "Full-body power expression with core deceleration.";
            sets = 4; reps = 10; durationSec = 0;
            instructions = "1. Hold ball/pillow overhead. 2. Slam it to the floor with maximum force. 3. Squat to pick it up. 4. Stand, slam again.";
            difficulty = "intermediate";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 28;
        title = "Day 28 – Active Recovery";
        focus = "Full Body Stretch & Breathwork";
        exercises = [
          {
            name        = "Full Body Yoga Flow";
            description = "15-minute gentle yoga sequence connecting all major muscle groups.";
            sets = 1; reps = 1; durationSec = 0;
            instructions = "Follow sequence: Mountain > Forward Fold > Low Lunge > Warrior I > Warrior II > Triangle > Seated Forward Fold > Supine Twist > Savasana. 1 minute per pose.";
            difficulty = "beginner";
          },
          {
            name        = "Box Breathing";
            description = "4-4-4-4 breathing pattern for nervous system reset.";
            sets = 1; reps = 10; durationSec = 0;
            instructions = "1. Inhale 4 s. 2. Hold 4 s. 3. Exhale 4 s. 4. Hold 4 s. That is 1 cycle. Repeat 10 times.";
            difficulty = "beginner";
          },
          {
            name        = "Neck Rolls";
            description = "Gentle cervical spine decompression.";
            sets = 2; reps = 5; durationSec = 0;
            instructions = "1. Drop chin to chest. 2. Slowly roll head to right shoulder. 3. Back to centre. 4. Roll to left. 5. Return. 1 cycle = 1 rep. NEVER roll head fully back.";
            difficulty = "beginner";
          },
          {
            name        = "Progressive Muscle Relaxation";
            description = "Systematic tensing and releasing of muscle groups for deep relaxation.";
            sets = 1; reps = 1; durationSec = 0;
            instructions = "Lie down. Work from feet to head: tense each muscle group 10 s, then release completely 20 s. Feet > calves > thighs > glutes > abs > hands > arms > shoulders > face.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },

      // ----------------------------------------------------------
      // FINAL 2 DAYS — Celebration & Consolidation
      // ----------------------------------------------------------
      {
        day = 29;
        title = "Day 29 – Personal Record Day";
        focus = "Test Your Fitness Gains";
        exercises = [
          {
            name        = "Max Push-Up Test";
            description = "Do as many push-ups as possible without stopping — track your PR.";
            sets = 1; reps = 0; durationSec = 0;
            instructions = "1. Fresh start — warm up lightly. 2. Perform push-ups to failure. 3. Record your number and compare to Day 1.";
            difficulty = "intermediate";
          },
          {
            name        = "1-Minute Squat Test";
            description = "How many air squats can you do in 60 seconds?";
            sets = 1; reps = 0; durationSec = 60;
            instructions = "1. Timer starts. 2. Air squat to parallel as many times as possible in 60 s. 3. Record number.";
            difficulty = "intermediate";
          },
          {
            name        = "Plank Max Hold";
            description = "Hold the plank until failure — track improvement from Day 1.";
            sets = 1; reps = 0; durationSec = 0;
            instructions = "1. Assume forearm plank. 2. Hold until form breaks. 3. Record time.";
            difficulty = "intermediate";
          },
          {
            name        = "Burpee 2-Minute Test";
            description = "How many burpees in 2 minutes?";
            sets = 1; reps = 0; durationSec = 120;
            instructions = "1. Perform burpees continuously for 2 minutes. 2. Record total reps. 3. Compare to your estimate on Day 1.";
            difficulty = "advanced";
          },
        ];
        meals = [];
      },
      // ----------------------------------------------------------
      {
        day = 30;
        title = "Day 30 – Celebration & Reset";
        focus = "Reflect, Stretch & Plan Ahead";
        exercises = [
          {
            name        = "Gratitude Walk";
            description = "10-minute mindful walk to celebrate completing the 30-day programme.";
            sets = 1; reps = 0; durationSec = 600;
            instructions = "1. Walk at a comfortable pace outdoors or indoors for 10 minutes. 2. With each breath, acknowledge a physical improvement you have noticed this month.";
            difficulty = "beginner";
          },
          {
            name        = "Full Body Foam Roll";
            description = "Head-to-toe self-massage to flush out accumulated tension.";
            sets = 1; reps = 0; durationSec = 600;
            instructions = "Roll each muscle group 60 s: calves > hamstrings > IT band > quads > glutes > upper back > lats. 10 minutes total.";
            difficulty = "beginner";
          },
          {
            name        = "Full Body Stretch Flow";
            description = "30-minute gentle stretch honouring every muscle group worked this month.";
            sets = 1; reps = 1; durationSec = 0;
            instructions = "Hold each position 45 s: Standing quad stretch > Seated hamstring > Pigeon > Figure 4 > Child's pose > Cat-Cow > Cobra > Side stretch > Neck rolls > Savasana.";
            difficulty = "beginner";
          },
          {
            name        = "Set Your Next Goal";
            description = "Mindset exercise — not physical.";
            sets = 1; reps = 1; durationSec = 0;
            instructions = "Write down or voice-record: 1. Your top 3 improvements this month. 2. One new physical goal for the next 30 days. 3. One habit you will keep from this programme.";
            difficulty = "beginner";
          },
        ];
        meals = [];
      },
    ];
  };
};
