// ============================================================
// lib/progress-and-diet.mo — Domain logic for progress & diet
// ============================================================
import Types  "../types/progress-and-diet";

module {

  // ── Progress Logic ─────────────────────────────────────────

  /// Initialise a blank UserProgress record for a new user
  public func newProgress(user : Principal) : Types.UserProgress {
    {
      principal        = user;
      completedDays    = [];
      lastCompletedDay = null;
      isDeveloper      = false;
      fitnessTrack     = #beginner;  // default; updated when profile is saved
    }
  };

  /// Return true if the user is allowed to complete the given day.
  /// Day 1 has no prerequisite. Day N requires day N-1 is complete,
  /// unless the user is a developer.
  public func canCompleteDay(
    progress : Types.UserProgress,
    day      : Nat,
  ) : Bool {
    if (progress.isDeveloper) return true;
    if (day == 0 or day > 30) return false;
    if (day == 1) return true;
    let prev : Nat = day - 1 : Nat;
    progress.completedDays.find<Nat>(func(d) { d == prev }) != null
  };

  /// Record `day` as completed and return the updated progress.
  /// Caller must have already validated the day is completable.
  public func recordCompletion(
    progress : Types.UserProgress,
    day      : Nat,
  ) : Types.UserProgress {
    // Avoid duplicates
    let alreadyDone = progress.completedDays.find<Nat>(func(d) { d == day }) != null;
    if (alreadyDone) return progress;
    let updated = progress.completedDays.concat([day]);
    { progress with completedDays = updated; lastCompletedDay = ?day }
  };

  /// Mark the user as a developer. Returns the updated progress.
  public func enableDeveloper(
    progress : Types.UserProgress,
  ) : Types.UserProgress {
    { progress with isDeveloper = true }
  };

  // ── Diet Data ──────────────────────────────────────────────

  /// Return the four meals (breakfast, lunch, dinner, snack) for a given day.
  /// Returns an empty array for out-of-range days.
  public func getMealsForDay(day : Nat) : [Types.Meal] {
    if (day == 0 or day > 30) return [];
    allMeals()[day - 1]
  };

  // ── Private meal data (all 30 days) ───────────────────────

  private func allMeals() : [[Types.Meal]] {
    [
      // Day 1 — Mobility & Activation → light, balanced
      [
        { name = "Overnight Oats with Banana"; mealType = #breakfast;
          ingredients = ["½ cup rolled oats", "½ cup almond milk", "1 banana (sliced)", "1 tsp honey", "1 tbsp chia seeds"];
          macros = { calories = 340; proteinG = 10; carbsG = 58; fatG = 7 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Combine oats, almond milk, and chia seeds in a jar.", "Refrigerate overnight.", "Top with banana slices and honey before serving."] },
        { name = "Grilled Chicken & Quinoa Bowl"; mealType = #lunch;
          ingredients = ["150g chicken breast", "½ cup quinoa", "1 cup spinach", "½ avocado", "lemon juice", "olive oil"];
          macros = { calories = 510; proteinG = 42; carbsG = 40; fatG = 16 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Cook quinoa per package. Season chicken and grill 6 min per side.", "Slice chicken. Dress spinach with lemon juice and olive oil.", "Build bowl: quinoa, spinach, chicken, avocado."] },
        { name = "Salmon with Sweet Potato & Steamed Broccoli"; mealType = #dinner;
          ingredients = ["180g salmon fillet", "1 medium sweet potato", "200g broccoli", "1 tsp olive oil", "garlic", "salt and pepper"];
          macros = { calories = 540; proteinG = 44; carbsG = 42; fatG = 14 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Preheat oven to 200°C. Cube and roast sweet potato 25 min.", "Season salmon and bake 12–14 min.", "Steam broccoli 5 min. Plate together."] },
        { name = "Greek Yogurt & Berry Mix"; mealType = #snack;
          ingredients = ["200g Greek yogurt (plain)", "½ cup mixed berries", "1 tbsp flaxseed"];
          macros = { calories = 190; proteinG = 16; carbsG = 20; fatG = 4 };
          prepTimeMins = 3; servings = 1;
          instructions = ["Spoon yogurt into a bowl.", "Top with mixed berries.", "Sprinkle flaxseed and serve."] },
      ],
      // Day 2 — Core Strength → moderate carbs + protein
      [
        { name = "Scrambled Eggs with Whole Grain Toast"; mealType = #breakfast;
          ingredients = ["3 eggs", "2 slices whole grain bread", "1 tsp butter", "salt", "pepper", "chives"];
          macros = { calories = 390; proteinG = 24; carbsG = 34; fatG = 16 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Whisk eggs with salt and pepper.", "Melt butter in pan on medium, add eggs, stir gently until just set.", "Toast bread, top with eggs, garnish with chives."] },
        { name = "Turkey & Veggie Wrap"; mealType = #lunch;
          ingredients = ["100g sliced turkey breast", "1 whole wheat tortilla", "lettuce", "tomato", "cucumber", "mustard", "1 tbsp hummus"];
          macros = { calories = 420; proteinG = 34; carbsG = 38; fatG = 10 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Spread hummus and mustard on tortilla.", "Layer turkey, lettuce, tomato, cucumber.", "Roll tightly and slice diagonally."] },
        { name = "Lean Beef Stir-Fry with Brown Rice"; mealType = #dinner;
          ingredients = ["150g lean beef strips", "½ cup brown rice", "1 bell pepper", "1 cup snap peas", "2 tbsp soy sauce (low sodium)", "1 tsp sesame oil", "garlic", "ginger"];
          macros = { calories = 550; proteinG = 40; carbsG = 52; fatG = 13 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook rice. Stir-fry beef in sesame oil until browned, set aside.", "Stir-fry vegetables with garlic and ginger 3 min.", "Add beef back, pour in soy sauce, toss. Serve over rice."] },
        { name = "Apple with Almond Butter"; mealType = #snack;
          ingredients = ["1 medium apple", "2 tbsp almond butter"];
          macros = { calories = 210; proteinG = 5; carbsG = 28; fatG = 10 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Slice apple into wedges.", "Serve with almond butter for dipping."] },
      ],
      // Day 3 — Legs & Glutes → carb-rich for muscle fuel
      [
        { name = "Banana Protein Smoothie"; mealType = #breakfast;
          ingredients = ["1 banana", "1 scoop vanilla protein powder", "1 cup oat milk", "1 tbsp peanut butter", "ice cubes"];
          macros = { calories = 430; proteinG = 32; carbsG = 52; fatG = 9 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Add all ingredients to blender.", "Blend until smooth.", "Pour into a glass and serve immediately."] },
        { name = "Pasta with Tomato & Chicken"; mealType = #lunch;
          ingredients = ["80g whole wheat pasta", "120g chicken breast", "½ cup tomato passata", "garlic", "basil", "olive oil", "parmesan (10g)"];
          macros = { calories = 560; proteinG = 42; carbsG = 58; fatG = 12 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook pasta al dente. Season and grill chicken, slice.", "Sauté garlic in oil, add passata, simmer 10 min.", "Toss pasta in sauce, top with chicken and parmesan."] },
        { name = "Roasted Chicken Thighs with Potato & Asparagus"; mealType = #dinner;
          ingredients = ["2 chicken thighs (bone-in)", "2 medium potatoes", "150g asparagus", "rosemary", "garlic", "olive oil"];
          macros = { calories = 620; proteinG = 48; carbsG = 50; fatG = 18 };
          prepTimeMins = 45; servings = 1;
          instructions = ["Preheat oven 200°C. Toss potatoes with oil and rosemary, roast 20 min.", "Season chicken, add to pan, roast further 25 min.", "Add asparagus last 10 min. Serve together."] },
        { name = "Rice Cake with Cottage Cheese"; mealType = #snack;
          ingredients = ["2 rice cakes", "½ cup cottage cheese", "cherry tomatoes", "black pepper"];
          macros = { calories = 180; proteinG = 14; carbsG = 22; fatG = 3 };
          prepTimeMins = 3; servings = 1;
          instructions = ["Spread cottage cheese onto rice cakes.", "Top with halved cherry tomatoes.", "Season with black pepper."] },
      ],
      // Day 4 — Chest/Shoulders/Triceps → high protein push day
      [
        { name = "Egg White Omelette with Spinach & Feta"; mealType = #breakfast;
          ingredients = ["4 egg whites", "1 cup baby spinach", "30g feta cheese", "½ tomato", "1 tsp olive oil"];
          macros = { calories = 230; proteinG = 28; carbsG = 6; fatG = 10 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Whisk egg whites. Heat olive oil in pan on medium.", "Add spinach until wilted. Pour in egg whites.", "Add tomato and feta, fold omelette. Cook until set."] },
        { name = "Tuna Salad Plate"; mealType = #lunch;
          ingredients = ["1 can tuna in water (drained)", "mixed greens", "cherry tomatoes", "cucumber", "red onion", "1 tbsp olive oil", "lemon juice", "capers"];
          macros = { calories = 350; proteinG = 40; carbsG = 12; fatG = 14 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Drain tuna and flake into bowl.", "Combine greens, tomatoes, cucumber, onion.", "Dress with olive oil and lemon. Top with tuna and capers."] },
        { name = "Turkey Meatballs with Zucchini Noodles"; mealType = #dinner;
          ingredients = ["150g ground turkey", "2 zucchinis (spiralised)", "½ cup marinara sauce", "garlic", "parsley", "egg white", "breadcrumbs (2 tbsp)"];
          macros = { calories = 480; proteinG = 46; carbsG = 22; fatG = 14 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Mix turkey, egg white, breadcrumbs, garlic, parsley. Form meatballs.", "Bake at 190°C for 20 min.", "Heat marinara, toss with zucchini noodles, top with meatballs."] },
        { name = "Protein Bar & Handful of Walnuts"; mealType = #snack;
          ingredients = ["1 protein bar (low sugar)", "20g walnuts"];
          macros = { calories = 250; proteinG = 18; carbsG = 18; fatG = 10 };
          prepTimeMins = 0; servings = 1;
          instructions = ["Choose a bar with at least 15g protein.", "Pair with walnuts for healthy fats.", "Eat 30–60 min before or after training."] },
      ],
      // Day 5 — Cardio Blast → light and energising
      [
        { name = "Green Smoothie Bowl"; mealType = #breakfast;
          ingredients = ["1 banana (frozen)", "½ cup mango", "1 cup spinach", "½ cup coconut water", "granola (2 tbsp)", "kiwi slices"];
          macros = { calories = 360; proteinG = 8; carbsG = 70; fatG = 4 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Blend banana, mango, spinach and coconut water until thick.", "Pour into bowl.", "Top with granola and kiwi slices."] },
        { name = "Lentil Soup with Rye Bread"; mealType = #lunch;
          ingredients = ["1 cup red lentils", "1 carrot", "1 celery stalk", "½ onion", "2 cups vegetable broth", "cumin", "turmeric", "1 slice rye bread"];
          macros = { calories = 480; proteinG = 28; carbsG = 72; fatG = 4 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Sauté onion, carrot, celery 5 min.", "Add lentils, broth, spices. Simmer 20 min.", "Blend partially. Serve with rye bread."] },
        { name = "Baked Cod with Roasted Vegetables"; mealType = #dinner;
          ingredients = ["180g cod fillet", "1 cup mixed roasted vegetables (courgette, pepper, cherry tomatoes)", "olive oil", "lemon", "dill"];
          macros = { calories = 390; proteinG = 40; carbsG = 22; fatG = 10 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Preheat oven 200°C. Toss vegetables in oil, roast 20 min.", "Season cod with lemon and dill, place on top of vegetables.", "Bake together 12 min until cod flakes."] },
        { name = "Energy Dates & Almonds"; mealType = #snack;
          ingredients = ["3 Medjool dates", "15 raw almonds"];
          macros = { calories = 230; proteinG = 4; carbsG = 38; fatG = 8 };
          prepTimeMins = 0; servings = 1;
          instructions = ["Remove pits from dates.", "Pair with almonds for balanced energy.", "Ideal pre-cardio snack 45 min before training."] },
      ],
      // Day 6 — Back & Biceps → high protein pull day
      [
        { name = "Greek Yogurt Parfait with Granola"; mealType = #breakfast;
          ingredients = ["200g Greek yogurt (2% fat)", "3 tbsp granola", "½ cup blueberries", "1 tsp honey"];
          macros = { calories = 370; proteinG = 22; carbsG = 48; fatG = 8 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Layer yogurt in glass.", "Add granola layer, then blueberries.", "Drizzle honey on top."] },
        { name = "Chicken & Black Bean Burrito Bowl"; mealType = #lunch;
          ingredients = ["130g grilled chicken", "½ cup black beans", "½ cup brown rice", "salsa", "lime juice", "cilantro", "jalapeño"];
          macros = { calories = 530; proteinG = 46; carbsG = 54; fatG = 8 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Cook rice. Grill and slice chicken.", "Warm black beans with cumin and lime.", "Assemble bowl: rice, beans, chicken, salsa, cilantro."] },
        { name = "Shrimp Stir-Fry with Broccoli & Noodles"; mealType = #dinner;
          ingredients = ["200g shrimp (peeled)", "100g soba noodles", "2 cups broccoli florets", "2 tbsp oyster sauce", "ginger", "garlic", "sesame seeds"];
          macros = { calories = 510; proteinG = 44; carbsG = 52; fatG = 8 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Cook soba noodles, drain. Stir-fry shrimp 3 min, set aside.", "Stir-fry broccoli with garlic and ginger 4 min.", "Add noodles, shrimp, oyster sauce. Toss. Serve with sesame seeds."] },
        { name = "Hard-Boiled Eggs"; mealType = #snack;
          ingredients = ["2 large eggs", "pinch of salt", "pinch of paprika"];
          macros = { calories = 150; proteinG = 12; carbsG = 1; fatG = 10 };
          prepTimeMins = 12; servings = 1;
          instructions = ["Place eggs in cold water. Bring to boil, simmer 10 min.", "Transfer to ice water for 2 min.", "Peel, season with salt and paprika."] },
      ],
      // Day 7 — Active Recovery → light and anti-inflammatory
      [
        { name = "Avocado Toast with Poached Egg"; mealType = #breakfast;
          ingredients = ["2 slices sourdough", "1 avocado", "2 eggs", "red pepper flakes", "lemon juice", "salt"];
          macros = { calories = 480; proteinG = 20; carbsG = 44; fatG = 24 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Toast bread. Mash avocado with lemon, salt, and red pepper flakes.", "Poach eggs 3–4 min in simmering water.", "Spread avocado on toast, top with poached eggs."] },
        { name = "Miso Soup with Tofu & Edamame"; mealType = #lunch;
          ingredients = ["2 tsp miso paste", "150g silken tofu", "½ cup shelled edamame", "1 sheet nori (crumbled)", "spring onions", "2 cups dashi or water"];
          macros = { calories = 290; proteinG = 24; carbsG = 18; fatG = 10 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Heat dashi/water, dissolve miso paste.", "Add cubed tofu and edamame, heat gently 3 min.", "Serve topped with nori and spring onions."] },
        { name = "Baked Lemon Herb Chicken with Roasted Carrots"; mealType = #dinner;
          ingredients = ["160g chicken breast", "2 large carrots", "1 tbsp olive oil", "lemon zest", "thyme", "garlic powder", "salt"];
          macros = { calories = 420; proteinG = 40; carbsG = 22; fatG = 12 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Preheat oven 190°C. Rub chicken with oil, lemon zest, thyme, garlic, salt.", "Slice carrots, toss in oil. Place both on baking tray.", "Roast 28–30 min until chicken cooked through."] },
        { name = "Chamomile Tea & Dark Chocolate"; mealType = #snack;
          ingredients = ["1 cup chamomile tea", "2 squares 85% dark chocolate"];
          macros = { calories = 110; proteinG = 2; carbsG = 12; fatG = 6 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Steep chamomile tea 4 min.", "Pair with dark chocolate squares.", "This snack supports recovery and sleep quality."] },
      ],
      // Day 8 — Core Progression → moderate, protein-forward
      [
        { name = "Cottage Cheese Pancakes"; mealType = #breakfast;
          ingredients = ["½ cup cottage cheese", "2 eggs", "¼ cup oat flour", "1 tsp vanilla", "pinch of cinnamon", "maple syrup (1 tbsp)"];
          macros = { calories = 360; proteinG = 28; carbsG = 34; fatG = 12 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Blend cottage cheese, eggs, oat flour, vanilla until smooth.", "Cook on medium heat 2–3 min per side.", "Serve with maple syrup."] },
        { name = "Salmon Caesar Wrap"; mealType = #lunch;
          ingredients = ["100g canned salmon", "1 whole wheat tortilla", "romaine lettuce", "2 tbsp Caesar dressing (light)", "parmesan (10g)", "croutons (handful)"];
          macros = { calories = 470; proteinG = 36; carbsG = 38; fatG = 16 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Flake salmon into a bowl.", "Toss with lettuce, dressing, parmesan, croutons.", "Place filling on tortilla and roll."] },
        { name = "Chicken Stuffed Bell Peppers"; mealType = #dinner;
          ingredients = ["2 bell peppers", "150g ground chicken", "½ cup brown rice", "½ cup tomato sauce", "mozzarella (30g)", "oregano", "garlic"];
          macros = { calories = 530; proteinG = 44; carbsG = 46; fatG = 14 };
          prepTimeMins = 45; servings = 1;
          instructions = ["Preheat oven 190°C. Halve peppers, remove seeds.", "Mix cooked rice, chicken, tomato sauce, garlic, oregano.", "Fill peppers, top with mozzarella. Bake 30 min."] },
        { name = "Celery with Peanut Butter"; mealType = #snack;
          ingredients = ["3 stalks celery", "2 tbsp peanut butter"];
          macros = { calories = 190; proteinG = 7; carbsG = 8; fatG = 14 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Cut celery into sticks.", "Fill groove with peanut butter.", "Serve fresh."] },
      ],
      // Day 9 — Lower Body Strength → carb-heavy for leg drive
      [
        { name = "Oatmeal with Walnut & Honey"; mealType = #breakfast;
          ingredients = ["¾ cup rolled oats", "1 cup water", "2 tbsp walnuts", "1 tbsp honey", "pinch of cinnamon"];
          macros = { calories = 400; proteinG = 10; carbsG = 62; fatG = 12 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Cook oats in water 5 min, stirring.", "Top with walnuts, drizzle honey.", "Sprinkle cinnamon and serve."] },
        { name = "Sweet Potato & Chickpea Bowl"; mealType = #lunch;
          ingredients = ["1 medium sweet potato (cubed, roasted)", "½ cup chickpeas", "½ cup couscous", "tahini dressing (2 tbsp)", "lemon", "parsley"];
          macros = { calories = 520; proteinG = 20; carbsG = 78; fatG = 12 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Roast sweet potato 25 min at 200°C.", "Fluff cooked couscous. Warm chickpeas.", "Assemble bowl, drizzle tahini, squeeze lemon, top with parsley."] },
        { name = "Grilled Steak with Mashed Potato & Green Beans"; mealType = #dinner;
          ingredients = ["160g sirloin steak", "2 medium potatoes", "150g green beans", "1 tbsp butter", "garlic", "rosemary"];
          macros = { calories = 640; proteinG = 50; carbsG = 52; fatG = 18 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Boil potatoes, mash with butter and garlic.", "Season steak with rosemary and salt, grill 3–4 min per side.", "Steam green beans 4 min. Plate together."] },
        { name = "Banana & Peanut Butter Rice Cakes"; mealType = #snack;
          ingredients = ["2 rice cakes", "1 tbsp peanut butter", "½ banana (sliced)"];
          macros = { calories = 200; proteinG = 5; carbsG = 34; fatG = 6 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Spread peanut butter on rice cakes.", "Top with banana slices.", "Serve immediately."] },
      ],
      // Day 10 — Speed & Coordination → energising and light
      [
        { name = "Acai Bowl"; mealType = #breakfast;
          ingredients = ["100g frozen acai", "½ banana", "½ cup mixed berries", "¼ cup oat milk", "granola (2 tbsp)", "coconut flakes (1 tsp)"];
          macros = { calories = 380; proteinG = 6; carbsG = 62; fatG = 10 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Blend acai, banana, berries, and oat milk until thick.", "Pour into bowl.", "Top with granola and coconut flakes."] },
        { name = "Chicken Vegetable Soup"; mealType = #lunch;
          ingredients = ["100g cooked chicken", "1 cup mixed vegetables (carrot, celery, peas)", "2 cups chicken broth", "½ cup egg noodles", "thyme", "bay leaf"];
          macros = { calories = 400; proteinG = 36; carbsG = 38; fatG = 8 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Simmer broth with vegetables and herbs 15 min.", "Add noodles, cook 8 min.", "Add chicken, heat through. Remove bay leaf."] },
        { name = "Prawn Tacos with Mango Salsa"; mealType = #dinner;
          ingredients = ["200g prawns", "2 small corn tortillas", "½ mango (diced)", "red onion", "cilantro", "lime juice", "jalapeño", "cabbage (shredded)"];
          macros = { calories = 460; proteinG = 38; carbsG = 48; fatG = 8 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Season and sauté prawns 3 min each side.", "Mix mango, onion, cilantro, lime, jalapeño for salsa.", "Warm tortillas. Fill with cabbage, prawns, mango salsa."] },
        { name = "Mixed Nuts & Dried Cranberries"; mealType = #snack;
          ingredients = ["25g mixed nuts", "2 tbsp dried cranberries"];
          macros = { calories = 190; proteinG = 4; carbsG = 22; fatG = 10 };
          prepTimeMins = 0; servings = 1;
          instructions = ["Combine nuts and cranberries in a small bowl.", "Portion into a snack bag for on-the-go.", "Provides sustained energy between meals."] },
      ],
      // Day 11 — Push & Pull Superset → high protein
      [
        { name = "Smoked Salmon Bagel"; mealType = #breakfast;
          ingredients = ["1 whole grain bagel", "80g smoked salmon", "2 tbsp cream cheese (light)", "capers", "red onion", "dill"];
          macros = { calories = 420; proteinG = 28; carbsG = 44; fatG = 12 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Slice and toast bagel.", "Spread cream cheese on both halves.", "Top with smoked salmon, capers, onion, dill."] },
        { name = "High-Protein Chicken Salad"; mealType = #lunch;
          ingredients = ["180g grilled chicken breast", "mixed greens", "hard-boiled egg", "cherry tomatoes", "cucumber", "2 tbsp vinaigrette"];
          macros = { calories = 450; proteinG = 52; carbsG = 12; fatG = 18 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Grill and slice chicken. Halve egg.", "Build salad with all vegetables.", "Drizzle vinaigrette and top with chicken and egg."] },
        { name = "Baked Salmon with Quinoa & Asparagus"; mealType = #dinner;
          ingredients = ["180g salmon fillet", "½ cup quinoa", "150g asparagus", "lemon", "dill", "olive oil"];
          macros = { calories = 560; proteinG = 48; carbsG = 38; fatG = 18 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Cook quinoa. Preheat oven 200°C.", "Place salmon and asparagus on tray, drizzle oil, season with dill and lemon.", "Bake 14 min. Serve over quinoa."] },
        { name = "Protein Shake with Milk"; mealType = #snack;
          ingredients = ["1 scoop chocolate protein powder", "300ml semi-skimmed milk", "ice cubes"];
          macros = { calories = 250; proteinG = 30; carbsG = 22; fatG = 5 };
          prepTimeMins = 3; servings = 1;
          instructions = ["Add protein powder and milk to shaker.", "Add ice, shake vigorously 15 s.", "Consume within 30 min post-workout."] },
      ],
      // Day 12 — Full Body Endurance → balanced macros
      [
        { name = "Whole Wheat French Toast with Berries"; mealType = #breakfast;
          ingredients = ["2 slices whole wheat bread", "2 eggs", "¼ cup milk", "1 tsp cinnamon", "1 tsp vanilla", "½ cup mixed berries", "maple syrup (1 tbsp)"];
          macros = { calories = 420; proteinG = 22; carbsG = 54; fatG = 12 };
          prepTimeMins = 12; servings = 1;
          instructions = ["Whisk eggs, milk, cinnamon, vanilla. Dip bread slices.", "Cook on medium heat 2–3 min per side.", "Top with berries and a drizzle of maple syrup."] },
        { name = "Chickpea & Spinach Curry with Rice"; mealType = #lunch;
          ingredients = ["1 cup chickpeas", "2 cups baby spinach", "½ cup basmati rice", "½ cup canned tomatoes", "onion", "garlic", "garam masala", "cumin", "coconut milk (50ml)"];
          macros = { calories = 540; proteinG = 22; carbsG = 78; fatG = 12 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Sauté onion and garlic, add spices. Add tomatoes and coconut milk.", "Add chickpeas, simmer 15 min. Stir in spinach.", "Serve over cooked rice."] },
        { name = "Chicken & Vegetable Bake"; mealType = #dinner;
          ingredients = ["180g chicken breast", "1 courgette", "1 red onion", "cherry tomatoes", "garlic", "olive oil", "Italian herbs"];
          macros = { calories = 450; proteinG = 44; carbsG = 20; fatG = 18 };
          prepTimeMins = 40; servings = 1;
          instructions = ["Preheat oven 190°C. Chop vegetables and toss with oil and herbs.", "Place chicken and vegetables in baking dish.", "Bake 35 min until chicken is cooked through."] },
        { name = "Hummus & Veggie Sticks"; mealType = #snack;
          ingredients = ["4 tbsp hummus", "carrots", "cucumber", "bell pepper sticks"];
          macros = { calories = 170; proteinG = 7; carbsG = 18; fatG = 8 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Cut vegetables into sticks.", "Serve with hummus for dipping.", "Great pre-workout snack for sustained energy."] },
      ],
      // Day 13 — Core Balance → light and anti-inflammatory
      [
        { name = "Chia Pudding with Mango"; mealType = #breakfast;
          ingredients = ["3 tbsp chia seeds", "1 cup almond milk", "½ mango (diced)", "1 tsp honey", "lime zest"];
          macros = { calories = 310; proteinG = 10; carbsG = 44; fatG = 12 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Mix chia seeds and almond milk. Refrigerate overnight.", "In the morning, top with mango, honey, lime zest.", "Stir well before eating."] },
        { name = "Vietnamese Spring Rolls"; mealType = #lunch;
          ingredients = ["rice paper (4 sheets)", "100g cooked prawns", "vermicelli noodles (50g cooked)", "lettuce", "mint", "cucumber", "carrot", "peanut dipping sauce (2 tbsp)"];
          macros = { calories = 390; proteinG = 24; carbsG = 52; fatG = 8 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Soften rice paper in warm water 10 s each.", "Layer noodles, prawns, vegetables, mint on lower third.", "Roll tightly. Serve with peanut sauce."] },
        { name = "Turmeric Chicken with Cauliflower Rice"; mealType = #dinner;
          ingredients = ["160g chicken breast", "1 head cauliflower (riced)", "turmeric", "cumin", "coriander", "coconut oil", "lime juice"];
          macros = { calories = 420; proteinG = 44; carbsG = 20; fatG = 14 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Season chicken with turmeric, cumin, coriander. Pan-fry in coconut oil until cooked.", "Pulse cauliflower in food processor, sauté 5 min.", "Serve chicken over cauliflower rice with lime juice."] },
        { name = "Anti-Inflammatory Golden Milk"; mealType = #snack;
          ingredients = ["1 cup oat milk", "1 tsp turmeric", "½ tsp cinnamon", "pinch of black pepper", "1 tsp honey"];
          macros = { calories = 110; proteinG = 2; carbsG = 18; fatG = 3 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Heat oat milk in small pan (do not boil).", "Whisk in turmeric, cinnamon, pepper.", "Sweeten with honey and serve warm."] },
      ],
      // Day 14 — Yoga & Mobility Recovery → light and nourishing
      [
        { name = "Smoothie with Spinach & Pineapple"; mealType = #breakfast;
          ingredients = ["1 cup spinach", "½ cup pineapple chunks", "½ banana", "1 cup coconut water", "1 tbsp hemp seeds"];
          macros = { calories = 290; proteinG = 8; carbsG = 56; fatG = 5 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Combine all ingredients in blender.", "Blend until smooth.", "Serve immediately."] },
        { name = "Avocado & Egg Salad on Rye"; mealType = #lunch;
          ingredients = ["2 hard-boiled eggs", "½ avocado", "1 tsp Dijon mustard", "lemon juice", "2 slices rye bread", "watercress"];
          macros = { calories = 430; proteinG = 22; carbsG = 38; fatG = 22 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Mash eggs and avocado together with mustard and lemon.", "Season with salt and pepper.", "Pile onto rye bread, top with watercress."] },
        { name = "Steamed Fish with Ginger & Bok Choy"; mealType = #dinner;
          ingredients = ["180g white fish fillet", "2 bok choy heads", "2 cm fresh ginger (sliced)", "2 tbsp soy sauce (low sodium)", "sesame oil (1 tsp)", "spring onions"];
          macros = { calories = 340; proteinG = 42; carbsG = 10; fatG = 12 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Place fish on steaming plate, top with ginger.", "Steam over boiling water 10–12 min.", "Steam bok choy 3 min. Dress with soy sauce and sesame oil, top with spring onions."] },
        { name = "Fruit Salad with Mint"; mealType = #snack;
          ingredients = ["½ cup strawberries", "½ cup melon", "½ cup grapes", "fresh mint leaves", "squeeze of lime"];
          macros = { calories = 120; proteinG = 2; carbsG = 28; fatG = 0 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Chop fruit into bite-sized pieces.", "Toss with lime juice.", "Garnish with fresh mint."] },
      ],
      // Day 15 — HIIT Cardio → high carb/energy replenishment
      [
        { name = "Peanut Butter & Banana Protein Oats"; mealType = #breakfast;
          ingredients = ["¾ cup rolled oats", "1 scoop vanilla protein powder", "1 banana", "2 tbsp peanut butter", "1 cup water"];
          macros = { calories = 560; proteinG = 34; carbsG = 68; fatG = 14 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Cook oats in water 5 min.", "Stir in protein powder.", "Top with sliced banana and peanut butter."] },
        { name = "Loaded Sweet Potato with Turkey"; mealType = #lunch;
          ingredients = ["1 large sweet potato", "100g ground turkey", "½ cup black beans", "salsa", "sour cream (1 tbsp)", "cheddar (20g)"];
          macros = { calories = 570; proteinG = 44; carbsG = 62; fatG = 12 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Bake sweet potato 40 min at 200°C.", "Cook turkey with black beans and seasoning.", "Split potato, load with turkey mix, top with salsa, cheese, sour cream."] },
        { name = "Beef & Broccoli with White Rice"; mealType = #dinner;
          ingredients = ["160g lean beef strips", "2 cups broccoli", "½ cup white rice", "2 tbsp soy sauce", "1 tbsp oyster sauce", "garlic", "ginger", "cornstarch (1 tsp)"];
          macros = { calories = 590; proteinG = 46; carbsG = 58; fatG = 16 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook rice. Marinate beef in soy sauce, cornstarch 10 min.", "Stir-fry beef 3 min, set aside. Stir-fry broccoli with garlic and ginger.", "Add beef back, oyster sauce, toss. Serve over rice."] },
        { name = "Chocolate Milk Recovery Shake"; mealType = #snack;
          ingredients = ["300ml low-fat chocolate milk", "1 tbsp honey"];
          macros = { calories = 230; proteinG = 10; carbsG = 38; fatG = 5 };
          prepTimeMins = 1; servings = 1;
          instructions = ["Pour chocolate milk into a glass.", "Stir in honey.", "Consume within 30 min after HIIT session for recovery."] },
      ],
      // Day 16 — Explosive Legs → high carb and protein
      [
        { name = "Pancakes with Blueberry Compote"; mealType = #breakfast;
          ingredients = ["½ cup plain flour", "½ cup oat flour", "1 egg", "¾ cup milk", "1 tsp baking powder", "½ cup blueberries", "1 tsp lemon juice", "1 tbsp maple syrup"];
          macros = { calories = 480; proteinG = 18; carbsG = 78; fatG = 8 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Whisk dry ingredients, make well, add egg and milk. Mix.", "Cook pancakes on medium 2 min per side.", "Simmer blueberries with lemon and maple syrup 5 min for compote."] },
        { name = "Beef & Lentil Stew with Crusty Bread"; mealType = #lunch;
          ingredients = ["100g lean beef", "½ cup green lentils", "1 carrot", "1 celery stalk", "½ can diced tomatoes", "beef broth", "thyme", "1 slice crusty bread"];
          macros = { calories = 560; proteinG = 44; carbsG = 56; fatG = 10 };
          prepTimeMins = 40; servings = 1;
          instructions = ["Brown beef. Add vegetables, cook 5 min.", "Add lentils, tomatoes, broth, thyme. Simmer 25 min.", "Serve with crusty bread."] },
        { name = "Baked Chicken Thighs with Polenta & Kale"; mealType = #dinner;
          ingredients = ["2 chicken thighs", "½ cup polenta", "2 cups kale (chopped)", "garlic", "lemon", "parmesan (20g)", "olive oil"];
          macros = { calories = 620; proteinG = 52; carbsG = 50; fatG = 20 };
          prepTimeMins = 40; servings = 1;
          instructions = ["Cook polenta per package, stir in parmesan.", "Season and bake chicken thighs 30 min at 200°C.", "Sauté kale with garlic and lemon. Plate all together."] },
        { name = "Banana with Greek Yogurt Dip"; mealType = #snack;
          ingredients = ["1 banana", "100g Greek yogurt", "½ tsp cinnamon"];
          macros = { calories = 200; proteinG = 10; carbsG = 34; fatG = 2 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Slice banana.", "Stir cinnamon into yogurt.", "Dip banana slices in yogurt."] },
      ],
      // Day 17 — Chest/Shoulders/Triceps → high protein push
      [
        { name = "High-Protein Breakfast Burrito"; mealType = #breakfast;
          ingredients = ["3 eggs", "2 egg whites", "1 whole wheat tortilla", "black beans (3 tbsp)", "salsa", "shredded cheese (20g)", "jalapeño"];
          macros = { calories = 480; proteinG = 38; carbsG = 38; fatG = 16 };
          prepTimeMins = 12; servings = 1;
          instructions = ["Scramble eggs and egg whites. Warm black beans.", "Place on tortilla, add salsa, cheese, jalapeño.", "Roll up and serve."] },
        { name = "Grilled Chicken Pita Pocket"; mealType = #lunch;
          ingredients = ["130g grilled chicken", "1 whole wheat pita", "lettuce", "tomato", "red onion", "tzatziki (2 tbsp)"];
          macros = { calories = 450; proteinG = 44; carbsG = 38; fatG = 10 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Grill chicken, slice thin.", "Warm pita. Fill with lettuce, tomato, onion.", "Add chicken, top with tzatziki."] },
        { name = "Pork Tenderloin with Roasted Parsnips & Brussels Sprouts"; mealType = #dinner;
          ingredients = ["180g pork tenderloin", "2 parsnips (cubed)", "150g Brussels sprouts", "apple cider vinegar", "honey", "thyme", "olive oil"];
          macros = { calories = 540; proteinG = 48; carbsG = 42; fatG = 16 };
          prepTimeMins = 40; servings = 1;
          instructions = ["Preheat oven 200°C. Toss parsnips and sprouts in oil and thyme, roast 25 min.", "Season pork, glaze with honey and vinegar, roast 20 min.", "Rest 5 min before slicing."] },
        { name = "Cottage Cheese with Pineapple"; mealType = #snack;
          ingredients = ["200g cottage cheese", "½ cup pineapple chunks", "1 tsp honey"];
          macros = { calories = 200; proteinG = 22; carbsG = 22; fatG = 3 };
          prepTimeMins = 3; servings = 1;
          instructions = ["Spoon cottage cheese into bowl.", "Top with pineapple chunks.", "Drizzle honey on top."] },
      ],
      // Day 18 — Back/Biceps/Rear Delts → high protein pull
      [
        { name = "Smoked Mackerel on Rye"; mealType = #breakfast;
          ingredients = ["100g smoked mackerel (flaked)", "2 slices rye crispbread", "cream cheese (1 tbsp)", "cucumber slices", "dill", "lemon juice"];
          macros = { calories = 380; proteinG = 28; carbsG = 18; fatG = 22 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Spread cream cheese on crispbread.", "Top with flaked mackerel.", "Add cucumber, dill, squeeze of lemon."] },
        { name = "Edamame Power Bowl"; mealType = #lunch;
          ingredients = ["½ cup shelled edamame", "½ cup brown rice", "½ cup shredded red cabbage", "carrot (grated)", "sesame ginger dressing (2 tbsp)", "toasted sesame seeds"];
          macros = { calories = 480; proteinG = 26; carbsG = 60; fatG = 12 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Cook rice. Blanch edamame 3 min.", "Assemble bowl with rice, edamame, cabbage, carrot.", "Drizzle dressing, sprinkle sesame seeds."] },
        { name = "Lamb Kofta with Roasted Aubergine & Tabbouleh"; mealType = #dinner;
          ingredients = ["150g ground lamb", "1 aubergine", "½ cup bulgur wheat", "parsley", "mint", "lemon juice", "olive oil", "cumin", "coriander"];
          macros = { calories = 580; proteinG = 44; carbsG = 46; fatG = 22 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Season lamb with spices, form into koftas. Grill 10 min.", "Cube aubergine and roast 25 min at 200°C.", "Soak bulgur in boiling water 20 min. Mix with herbs, lemon, olive oil for tabbouleh."] },
        { name = "Tuna & Avocado on Cucumber"; mealType = #snack;
          ingredients = ["½ can tuna (drained)", "¼ avocado (mashed)", "cucumber slices", "lemon", "salt"];
          macros = { calories = 160; proteinG = 18; carbsG = 4; fatG = 8 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Mix tuna with mashed avocado and lemon juice.", "Spoon onto cucumber slices.", "Season with salt and serve."] },
      ],
      // Day 19 — Advanced Core → moderate calories, protein-forward
      [
        { name = "Eggs Benedict (Light)"; mealType = #breakfast;
          ingredients = ["2 eggs (poached)", "2 whole grain English muffin halves", "60g Canadian bacon", "light hollandaise sauce (1 tbsp)", "spinach"];
          macros = { calories = 420; proteinG = 30; carbsG = 38; fatG = 14 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Toast muffin halves. Warm Canadian bacon.", "Poach eggs 3 min.", "Layer: muffin, bacon, spinach, egg. Drizzle hollandaise."] },
        { name = "Greek Salad with Grilled Halloumi"; mealType = #lunch;
          ingredients = ["80g halloumi (sliced and grilled)", "cucumber", "tomatoes", "olives (10)", "red onion", "feta (30g)", "oregano", "olive oil", "red wine vinegar"];
          macros = { calories = 450; proteinG = 24; carbsG = 14; fatG = 34 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Grill halloumi 2 min per side until golden.", "Chop all vegetables, combine with olives and feta.", "Dress with oil and vinegar, top with halloumi."] },
        { name = "Chicken Breast with Herbed Wild Rice & Steamed Spinach"; mealType = #dinner;
          ingredients = ["170g chicken breast", "½ cup wild rice blend", "2 cups spinach", "lemon zest", "fresh herbs (parsley, thyme)", "olive oil"];
          macros = { calories = 490; proteinG = 48; carbsG = 38; fatG = 12 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Cook wild rice per package.", "Season chicken with herbs and lemon zest. Bake 20 min at 190°C.", "Steam spinach 3 min with olive oil. Plate together."] },
        { name = "Boiled Eggs with Hot Sauce"; mealType = #snack;
          ingredients = ["2 eggs", "hot sauce (few drops)"];
          macros = { calories = 150; proteinG = 12; carbsG = 1; fatG = 10 };
          prepTimeMins = 12; servings = 1;
          instructions = ["Hard boil eggs 10 min. Cool in ice water.", "Peel, halve, and season with a dash of hot sauce.", "Provides clean protein between meals."] },
      ],
      // Day 20 — Full Body HIIT → max carb + protein recovery
      [
        { name = "Pre-Workout Energy Bowl"; mealType = #breakfast;
          ingredients = ["1 cup cooked oats", "1 scoop protein powder", "1 banana", "1 tbsp honey", "¼ cup granola", "almond butter (1 tbsp)"];
          macros = { calories = 620; proteinG = 36; carbsG = 80; fatG = 12 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Cook oats, stir in protein powder.", "Top with sliced banana, granola, almond butter.", "Drizzle honey on top. Eat 60 min before training."] },
        { name = "Muscle Recovery Chicken Rice Bowl"; mealType = #lunch;
          ingredients = ["180g chicken breast (grilled)", "1 cup white rice", "½ cup edamame", "soy sauce (2 tbsp)", "sesame oil (1 tsp)", "ginger", "scallions"];
          macros = { calories = 620; proteinG = 56; carbsG = 68; fatG = 10 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Cook rice. Grill chicken, slice.", "Warm edamame, toss with sesame oil and soy sauce.", "Assemble: rice, edamame, chicken, ginger, scallions."] },
        { name = "High-Protein Pasta Bolognese"; mealType = #dinner;
          ingredients = ["80g whole wheat pasta", "150g lean ground beef", "½ cup tomato sauce", "onion", "garlic", "carrot", "celery", "parmesan (20g)"];
          macros = { calories = 640; proteinG = 50; carbsG = 62; fatG = 16 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Cook pasta. Sauté onion, carrot, celery, garlic 5 min.", "Add beef, brown. Add tomato sauce, simmer 20 min.", "Toss pasta in sauce, top with parmesan."] },
        { name = "Recovery Smoothie"; mealType = #snack;
          ingredients = ["1 cup tart cherry juice", "1 scoop protein powder", "½ banana", "ice cubes"];
          macros = { calories = 270; proteinG = 24; carbsG = 38; fatG = 2 };
          prepTimeMins = 3; servings = 1;
          instructions = ["Add all ingredients to blender.", "Blend until smooth.", "Drink within 20 min post-HIIT for maximal recovery."] },
      ],
      // Day 21 — Foam Roll & Stretch → anti-inflammatory, light
      [
        { name = "Warm Porridge with Stewed Plums"; mealType = #breakfast;
          ingredients = ["¾ cup oats", "1 cup milk", "3 plums (halved, stoned)", "1 tbsp brown sugar", "1 tsp vanilla", "pinch of cinnamon"];
          macros = { calories = 390; proteinG = 12; carbsG = 68; fatG = 8 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Simmer plums with brown sugar 8 min until soft.", "Cook oats with milk and vanilla.", "Serve oats topped with stewed plums, sprinkle cinnamon."] },
        { name = "Anti-Inflammatory Tuna Niçoise"; mealType = #lunch;
          ingredients = ["1 can tuna", "green beans (100g, blanched)", "2 eggs (boiled)", "cherry tomatoes", "olives", "dijon mustard vinaigrette", "lettuce"];
          macros = { calories = 430; proteinG = 46; carbsG = 14; fatG = 20 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Blanch green beans 3 min. Halve boiled eggs.", "Arrange lettuce with tuna, beans, tomatoes, eggs, olives.", "Drizzle Dijon vinaigrette."] },
        { name = "Turkey & Vegetable Soup"; mealType = #dinner;
          ingredients = ["120g turkey breast", "1 cup mixed vegetables", "2 cups turkey/chicken broth", "½ cup pearl barley", "thyme", "bay leaf", "parsley"];
          macros = { calories = 400; proteinG = 40; carbsG = 36; fatG = 8 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Simmer broth with barley 20 min.", "Add turkey and vegetables, simmer further 15 min.", "Season with herbs. Remove bay leaf. Serve hot."] },
        { name = "Warm Lemon & Ginger Tea with Rice Cake"; mealType = #snack;
          ingredients = ["1 cup hot water", "1 slice lemon", "fresh ginger (2 cm, sliced)", "1 tsp honey", "1 rice cake"];
          macros = { calories = 90; proteinG = 1; carbsG = 20; fatG = 0 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Steep ginger and lemon in hot water 5 min.", "Stir in honey.", "Sip slowly alongside a plain rice cake."] },
      ],
      // Day 22 — Total Body Strength → high protein + moderate carbs
      [
        { name = "Turkey Egg Muffins"; mealType = #breakfast;
          ingredients = ["3 eggs", "2 egg whites", "60g ground turkey", "bell pepper (diced)", "spinach", "salt", "pepper", "mozzarella (20g)"];
          macros = { calories = 340; proteinG = 36; carbsG = 6; fatG = 18 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Preheat oven 180°C. Grease muffin tray.", "Mix eggs, turkey, vegetables, cheese, seasoning.", "Fill muffin cups ¾ full. Bake 20 min."] },
        { name = "Steak Fajita Bowl"; mealType = #lunch;
          ingredients = ["130g sirloin steak (grilled, sliced)", "½ cup rice", "grilled bell peppers", "onion", "salsa", "sour cream (1 tbsp)", "guacamole (2 tbsp)"];
          macros = { calories = 560; proteinG = 44; carbsG = 50; fatG = 18 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook rice. Grill steak and vegetables.", "Slice steak thinly against the grain.", "Assemble bowl, top with salsa, sour cream, guacamole."] },
        { name = "Pan-Seared Duck Breast with Lentils & Watercress"; mealType = #dinner;
          ingredients = ["160g duck breast", "½ cup puy lentils", "watercress (1 cup)", "shallots", "red wine vinegar", "Dijon mustard", "olive oil", "thyme"];
          macros = { calories = 590; proteinG = 52; carbsG = 32; fatG = 26 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Score duck skin, season. Sear skin-down 8 min, flip 4 min. Rest 5 min.", "Cook lentils with shallots and thyme 20 min.", "Dress watercress with vinegar, oil, mustard. Slice duck, plate over lentils."] },
        { name = "Protein Yogurt with Nut Mix"; mealType = #snack;
          ingredients = ["150g skyr or Icelandic yogurt", "1 tbsp mixed nuts", "1 tbsp pumpkin seeds"];
          macros = { calories = 200; proteinG = 20; carbsG = 10; fatG = 8 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Scoop skyr into a bowl.", "Sprinkle nuts and pumpkin seeds on top.", "Stir and enjoy as a high-protein snack."] },
      ],
      // Day 23 — Sustained Cardio → moderate carbs + light protein
      [
        { name = "Bircher Muesli"; mealType = #breakfast;
          ingredients = ["½ cup rolled oats", "½ cup apple juice", "½ apple (grated)", "2 tbsp yogurt", "1 tbsp raisins", "chopped hazelnuts (1 tbsp)"];
          macros = { calories = 380; proteinG = 10; carbsG = 66; fatG = 8 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Soak oats in apple juice overnight.", "In the morning, stir in grated apple, yogurt, raisins.", "Top with hazelnuts."] },
        { name = "Veggie Loaded Omelette with Sourdough"; mealType = #lunch;
          ingredients = ["3 eggs", "mushrooms", "spinach", "cherry tomatoes", "feta (25g)", "olive oil", "1 slice sourdough"];
          macros = { calories = 460; proteinG = 30; carbsG = 30; fatG = 22 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Sauté mushrooms and tomatoes in olive oil.", "Add spinach, wilt. Pour beaten eggs over, add feta.", "Fold when edges set. Serve with toasted sourdough."] },
        { name = "Chicken & Mushroom Risotto"; mealType = #dinner;
          ingredients = ["130g chicken breast", "½ cup arborio rice", "1 cup mushrooms", "2 cups chicken broth (warm)", "½ onion", "white wine (50ml)", "parmesan (20g)", "thyme"];
          macros = { calories = 560; proteinG = 46; carbsG = 58; fatG = 12 };
          prepTimeMins = 40; servings = 1;
          instructions = ["Sauté onion, add rice, toast 2 min, deglaze with wine.", "Add warm broth ladle by ladle, stirring, 18–20 min.", "Add mushrooms, chicken, parmesan, thyme. Rest 2 min before serving."] },
        { name = "Pear & Almond Butter"; mealType = #snack;
          ingredients = ["1 ripe pear", "2 tbsp almond butter"];
          macros = { calories = 220; proteinG = 5; carbsG = 30; fatG = 10 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Slice pear into wedges.", "Serve with almond butter for dipping.", "Good mid-endurance session snack."] },
      ],
      // Day 24 — Max Core Challenge → high protein, low carb
      [
        { name = "Smoked Salmon Scrambled Eggs"; mealType = #breakfast;
          ingredients = ["3 eggs", "60g smoked salmon", "cream cheese (1 tbsp)", "chives", "1 tsp butter", "salt", "pepper"];
          macros = { calories = 360; proteinG = 32; carbsG = 3; fatG = 24 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Gently scramble eggs with butter until just set.", "Stir in cream cheese and chives off heat.", "Serve immediately with smoked salmon on the side."] },
        { name = "Chicken & Cabbage Stir-Fry"; mealType = #lunch;
          ingredients = ["150g chicken breast", "2 cups cabbage (shredded)", "1 carrot (julienned)", "garlic", "ginger", "2 tbsp low-sodium soy sauce", "sesame oil (1 tsp)", "chilli flakes"];
          macros = { calories = 380; proteinG = 44; carbsG = 18; fatG = 10 };
          prepTimeMins = 20; servings = 1;
          instructions = ["Slice and stir-fry chicken until cooked.", "Add garlic, ginger, chilli. Add cabbage and carrot.", "Toss with soy sauce and sesame oil. Serve hot."] },
        { name = "Baked Sea Bass with Cauliflower Mash & Tenderstem Broccoli"; mealType = #dinner;
          ingredients = ["180g sea bass fillet", "½ head cauliflower", "150g tenderstem broccoli", "garlic butter (1 tbsp)", "lemon", "capers", "olive oil"];
          macros = { calories = 470; proteinG = 50; carbsG = 18; fatG = 20 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Steam cauliflower, blend with garlic butter to mash.", "Season sea bass, bake 12 min at 200°C with capers and lemon.", "Steam broccoli 5 min. Plate together."] },
        { name = "Pumpkin Seeds & Cheese Cubes"; mealType = #snack;
          ingredients = ["2 tbsp pumpkin seeds", "40g cheddar cheese cubes"];
          macros = { calories = 200; proteinG = 12; carbsG = 2; fatG = 16 };
          prepTimeMins = 1; servings = 1;
          instructions = ["Cube cheese.", "Pair with pumpkin seeds.", "High protein, low carb snack ideal for core day."] },
      ],
      // Day 25 — Legs Max Effort → high carb loading
      [
        { name = "Banana Oat Protein Pancakes"; mealType = #breakfast;
          ingredients = ["1 banana", "½ cup oats", "2 eggs", "1 scoop protein powder", "1 tsp cinnamon", "maple syrup (1 tbsp)"];
          macros = { calories = 520; proteinG = 34; carbsG = 70; fatG = 10 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Blend all ingredients until smooth.", "Cook pancakes on medium 2 min per side.", "Serve with maple syrup."] },
        { name = "Pasta Primavera with Chicken"; mealType = #lunch;
          ingredients = ["80g penne pasta", "120g chicken breast (grilled)", "½ cup cherry tomatoes", "1 cup mixed vegetables (broccoli, courgette, peas)", "garlic", "olive oil", "parmesan (15g)"];
          macros = { calories = 580; proteinG = 48; carbsG = 60; fatG = 12 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook pasta. Sauté vegetables in olive oil with garlic 6 min.", "Add cooked chicken and cherry tomatoes.", "Toss pasta through, top with parmesan."] },
        { name = "Shepherd's Pie (Lean)"; mealType = #dinner;
          ingredients = ["150g lean lamb mince", "2 potatoes (mashed)", "½ cup frozen peas", "½ cup diced carrots", "onion", "rosemary", "Worcestershire sauce", "beef broth"];
          macros = { calories = 620; proteinG = 46; carbsG = 60; fatG = 14 };
          prepTimeMins = 50; servings = 1;
          instructions = ["Cook lamb mince with onion, rosemary, Worcestershire sauce. Add carrots, peas, broth.", "Transfer to dish, top with mashed potato.", "Bake at 190°C for 25 min."] },
        { name = "Sports Energy Bar & Electrolyte Drink"; mealType = #snack;
          ingredients = ["1 natural energy bar", "500ml electrolyte water (coconut water or sports drink)"];
          macros = { calories = 250; proteinG = 6; carbsG = 48; fatG = 4 };
          prepTimeMins = 0; servings = 1;
          instructions = ["Choose an energy bar with simple carbohydrates.", "Pair with electrolyte drink to support heavy leg session.", "Consume 45 min before training."] },
      ],
      // Day 26 — Upper Body Burnout → high protein
      [
        { name = "Protein Waffles"; mealType = #breakfast;
          ingredients = ["½ cup protein pancake mix", "1 egg", "½ cup milk", "1 tsp vanilla", "Greek yogurt (2 tbsp)", "strawberries"];
          macros = { calories = 420; proteinG = 32; carbsG = 44; fatG = 10 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Mix batter per waffle mix instructions, adding egg and milk.", "Cook in waffle maker.", "Top with Greek yogurt and strawberries."] },
        { name = "Deli Turkey & Avocado Sandwich"; mealType = #lunch;
          ingredients = ["120g sliced deli turkey", "2 slices sourdough", "½ avocado (sliced)", "tomato", "rocket", "dijon mustard", "cracked black pepper"];
          macros = { calories = 470; proteinG = 38; carbsG = 40; fatG = 16 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Toast bread. Spread Dijon mustard on one side.", "Layer turkey, avocado, tomato, rocket.", "Season with black pepper, close sandwich."] },
        { name = "Grilled Chicken Breast with Brown Rice & Roasted Tomatoes"; mealType = #dinner;
          ingredients = ["190g chicken breast", "½ cup brown rice", "cherry tomatoes (200g)", "basil", "garlic", "olive oil", "balsamic glaze (1 tsp)"];
          macros = { calories = 530; proteinG = 54; carbsG = 48; fatG = 12 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Roast tomatoes with garlic and olive oil at 200°C for 20 min.", "Cook rice. Grill chicken breast 6 min per side.", "Plate together, drizzle balsamic glaze, garnish with basil."] },
        { name = "Cheese & Turkey Roll-Ups"; mealType = #snack;
          ingredients = ["3 slices deli turkey", "3 slices cheddar or Swiss cheese"];
          macros = { calories = 180; proteinG = 20; carbsG = 1; fatG = 10 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Lay cheese slice on turkey slice.", "Roll together tightly.", "Repeat for all pieces. Serve cold."] },
      ],
      // Day 27 — Speed & Power → explosive carbs + protein
      [
        { name = "Energy Overnight Oats"; mealType = #breakfast;
          ingredients = ["½ cup oats", "½ cup milk", "½ cup orange juice", "1 tbsp chia seeds", "1 orange (segmented)", "1 tbsp honey", "walnuts (1 tbsp)"];
          macros = { calories = 430; proteinG = 12; carbsG = 70; fatG = 10 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Mix oats, milk, juice, chia seeds. Refrigerate overnight.", "Morning: top with orange segments, honey, walnuts.", "Stir well before eating."] },
        { name = "Spicy Tuna Rice Bowl"; mealType = #lunch;
          ingredients = ["1 can tuna (drained)", "1 cup sushi rice (cooked)", "½ avocado", "cucumber", "sriracha mayo (1 tbsp)", "soy sauce", "sesame seeds", "nori strips"];
          macros = { calories = 540; proteinG = 42; carbsG = 62; fatG = 12 };
          prepTimeMins = 15; servings = 1;
          instructions = ["Season rice with rice vinegar.", "Place tuna on rice, top with avocado, cucumber, nori.", "Drizzle sriracha mayo and soy sauce, sprinkle sesame seeds."] },
        { name = "Chimichurri Skirt Steak with Grilled Corn & Salad"; mealType = #dinner;
          ingredients = ["170g skirt steak", "1 ear corn", "mixed salad leaves", "chimichurri sauce (3 tbsp)", "cherry tomatoes", "red onion", "olive oil"];
          macros = { calories = 610; proteinG = 52; carbsG = 38; fatG = 28 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Grill steak 3 min per side, rest 5 min, slice against grain.", "Grill corn until charred. Slice kernels off.", "Toss salad with oil and tomatoes. Top with steak and chimichurri."] },
        { name = "Pre-Power Snack: Rice Cakes with Banana & Honey"; mealType = #snack;
          ingredients = ["2 rice cakes", "1 banana", "1 tsp honey", "pinch of sea salt"];
          macros = { calories = 200; proteinG = 3; carbsG = 44; fatG = 1 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Slice banana onto rice cakes.", "Drizzle with honey.", "Pinch of sea salt for electrolytes. Eat 45 min before power session."] },
      ],
      // Day 28 — Full Body Stretch → healing, anti-inflammatory
      [
        { name = "Anti-Inflammatory Turmeric Oats"; mealType = #breakfast;
          ingredients = ["¾ cup oats", "1 cup golden milk (oat milk + turmeric + cinnamon)", "1 tbsp flaxseed", "½ cup blueberries", "1 tsp honey"];
          macros = { calories = 370; proteinG = 10; carbsG = 62; fatG = 8 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Heat golden milk and cook oats 5 min.", "Stir in flaxseed.", "Top with blueberries and honey."] },
        { name = "Roasted Beetroot & Goat Cheese Salad"; mealType = #lunch;
          ingredients = ["2 medium beetroots (roasted, sliced)", "50g goat cheese", "mixed leaves", "walnuts (20g)", "orange segments", "balsamic dressing (2 tbsp)"];
          macros = { calories = 380; proteinG = 14; carbsG = 34; fatG = 22 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Roast beetroots ahead (or use pre-cooked).", "Arrange leaves, beetroot, orange, walnuts, goat cheese.", "Drizzle balsamic dressing."] },
        { name = "Herb-Crusted Salmon with Green Lentils & Watercress"; mealType = #dinner;
          ingredients = ["180g salmon fillet", "½ cup green lentils", "watercress (1 cup)", "mixed herbs (parsley, dill, chives)", "dijon mustard (1 tsp)", "lemon", "olive oil"];
          macros = { calories = 560; proteinG = 50; carbsG = 32; fatG = 22 };
          prepTimeMins = 30; servings = 1;
          instructions = ["Press herb crust (herbs + mustard) onto salmon. Bake 14 min at 200°C.", "Cook lentils 20 min, drain, dress with olive oil and lemon.", "Plate lentils, top with salmon and watercress."] },
        { name = "Lavender & Honey Warm Milk"; mealType = #snack;
          ingredients = ["1 cup warm milk", "1 tsp honey", "¼ tsp dried lavender (culinary grade)", "pinch of nutmeg"];
          macros = { calories = 140; proteinG = 8; carbsG = 18; fatG = 4 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Warm milk gently, do not boil.", "Steep lavender 3 min, strain.", "Add honey and nutmeg. Sip before bedtime for recovery sleep."] },
      ],
      // Day 29 — Personal Record Day → balanced, fuelled for testing
      [
        { name = "High-Performance Egg Breakfast"; mealType = #breakfast;
          ingredients = ["3 whole eggs", "2 slices whole grain toast", "½ avocado", "tomatoes", "1 tsp butter", "salt", "pepper"];
          macros = { calories = 500; proteinG = 28; carbsG = 38; fatG = 26 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Fry or scramble eggs in butter.", "Toast bread, slice avocado.", "Plate with eggs, avocado, tomatoes. Season well."] },
        { name = "Lean Chicken Power Bowl"; mealType = #lunch;
          ingredients = ["180g chicken breast (grilled)", "½ cup quinoa", "roasted broccoli", "cherry tomatoes", "tahini sauce (2 tbsp)", "lemon juice", "fresh herbs"];
          macros = { calories = 530; proteinG = 56; carbsG = 42; fatG = 14 };
          prepTimeMins = 25; servings = 1;
          instructions = ["Cook quinoa. Roast broccoli at 200°C 20 min.", "Grill and slice chicken.", "Assemble, drizzle tahini and lemon juice, garnish with herbs."] },
        { name = "Celebratory Grilled Salmon Dinner"; mealType = #dinner;
          ingredients = ["200g salmon fillet", "1 cup roasted sweet potato wedges", "100g tenderstem broccoli", "garlic butter (1 tbsp)", "lemon", "fresh dill"];
          macros = { calories = 590; proteinG = 52; carbsG = 46; fatG = 22 };
          prepTimeMins = 35; servings = 1;
          instructions = ["Roast sweet potato 30 min at 200°C.", "Grill salmon with garlic butter and dill 10 min.", "Steam broccoli 5 min. Squeeze lemon over everything."] },
        { name = "Victory Chocolate Protein Mousse"; mealType = #snack;
          ingredients = ["200g Greek yogurt", "2 tbsp cocoa powder", "1 tbsp honey", "½ tsp vanilla extract", "raspberries (½ cup)"];
          macros = { calories = 240; proteinG = 20; carbsG = 26; fatG = 5 };
          prepTimeMins = 5; servings = 1;
          instructions = ["Whisk yogurt, cocoa, honey, vanilla until smooth.", "Top with fresh raspberries.", "Refrigerate 30 min for a firmer texture."] },
      ],
      // Day 30 — Celebration & Reset → clean, balanced, celebratory
      [
        { name = "Champion's Smoothie Bowl"; mealType = #breakfast;
          ingredients = ["1 cup frozen mixed berries", "½ banana", "1 scoop vanilla protein", "½ cup coconut milk", "granola (3 tbsp)", "fresh fruit (kiwi, strawberries)", "honey (1 tsp)"];
          macros = { calories = 480; proteinG = 28; carbsG = 68; fatG = 10 };
          prepTimeMins = 8; servings = 1;
          instructions = ["Blend berries, banana, protein, and coconut milk until thick.", "Pour into bowl.", "Top with granola, fresh fruit, and drizzle of honey."] },
        { name = "Mediterranean Mezze Plate"; mealType = #lunch;
          ingredients = ["hummus (4 tbsp)", "tabbouleh (½ cup)", "olives (10)", "feta (40g)", "cucumber", "cherry tomatoes", "warm pitta (1 piece)"];
          macros = { calories = 480; proteinG = 18; carbsG = 52; fatG = 22 };
          prepTimeMins = 10; servings = 1;
          instructions = ["Arrange hummus, tabbouleh, olives, and feta on a board.", "Add cucumber sticks, halved cherry tomatoes.", "Warm pitta in oven 3 min. Dip and enjoy."] },
        { name = "Celebration Herb-Roasted Chicken Dinner"; mealType = #dinner;
          ingredients = ["200g chicken breast", "roasted potatoes (150g)", "roasted carrots", "roasted garlic cloves", "rosemary", "thyme", "olive oil", "lemon zest"];
          macros = { calories = 610; proteinG = 52; carbsG = 48; fatG = 18 };
          prepTimeMins = 50; servings = 1;
          instructions = ["Rub chicken with herbs, lemon zest, olive oil. Surround with vegetables.", "Roast at 200°C for 40 min.", "Rest 5 min. Serve with all roasted vegetables as a celebration meal."] },
        { name = "Dark Chocolate & Fresh Strawberries"; mealType = #snack;
          ingredients = ["4 squares 85% dark chocolate", "1 cup fresh strawberries"];
          macros = { calories = 200; proteinG = 3; carbsG = 24; fatG = 10 };
          prepTimeMins = 2; servings = 1;
          instructions = ["Arrange dark chocolate squares on a plate.", "Wash and hull strawberries.", "Savour as a well-earned treat for completing 30 days!"] },
      ],
    ]
  };
};
