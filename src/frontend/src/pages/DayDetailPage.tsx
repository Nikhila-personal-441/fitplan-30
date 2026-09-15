import { createActor } from "@/backend";
import type {
  DayPlan as BackendDayPlan,
  Meal as BackendMeal,
  MealType as BackendMealType,
} from "@/backend.d";
import { Button } from "@/components/AppButton";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useDerivedProgress, useMarkDayComplete } from "@/hooks/useProgress";
import { useStepTracking } from "@/hooks/useStepTracking";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  useAddWater,
  useClearLastWater,
  useWaterTracking,
} from "@/hooks/useWaterTracking";
import type { Exercise } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  Droplets,
  Dumbbell,
  Flame,
  Footprints,
  Lock,
  RotateCcw,
  Salad,
  Smartphone,
  Sparkles,
  Undo2,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getFocusGradient(focus: string): string {
  const f = focus.toLowerCase();
  if (f.includes("strength") || f.includes("power"))
    return "linear-gradient(135deg, oklch(0.35 0.18 280), oklch(0.45 0.22 260))";
  if (f.includes("cardio") || f.includes("hiit") || f.includes("run"))
    return "linear-gradient(135deg, oklch(0.50 0.19 30), oklch(0.58 0.21 20))";
  if (
    f.includes("flex") ||
    f.includes("yoga") ||
    f.includes("stretch") ||
    f.includes("mobil")
  )
    return "linear-gradient(135deg, oklch(0.40 0.16 168), oklch(0.48 0.18 155))";
  return "linear-gradient(135deg, oklch(0.52 0.19 158), oklch(0.44 0.17 145))";
}

function getFocusIcon(focus: string) {
  const f = focus.toLowerCase();
  if (f.includes("cardio") || f.includes("hiit")) return Flame;
  if (f.includes("flex") || f.includes("yoga") || f.includes("stretch"))
    return Sparkles;
  return Dumbbell;
}

// ─── Difficulty Badge ─────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const d = difficulty.toLowerCase();
  const cls =
    d === "beginner"
      ? "difficulty-easy fitness-badge"
      : d === "advanced"
        ? "difficulty-hard fitness-badge"
        : "difficulty-moderate fitness-badge";
  return <span className={cls}>{difficulty}</span>;
}

// ─── Metric Pill ──────────────────────────────────────────────────────────────

function MetricPill({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5">
      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
      <span className="exercise-meta">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Exercise Card ────────────────────────────────────────────────────────────

function ExerciseCard({
  exercise,
  index,
}: { exercise: Exercise; index: number }) {
  const [open, setOpen] = useState(false);
  const hasSets = Number(exercise.sets) > 0;
  const hasReps = Number(exercise.reps) > 0;
  const hasDuration = Number(exercise.durationSec) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`day_detail.exercise.${index + 1}`}
    >
      <Card
        className="border border-border bg-card overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="h-1 w-full bg-primary" />
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary font-mono font-bold text-xs shrink-0">
                {index + 1}
              </span>
              <CardTitle className="text-base font-display font-semibold leading-tight">
                {exercise.name}
              </CardTitle>
            </div>
            <DifficultyBadge difficulty={exercise.difficulty} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          {exercise.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {exercise.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {hasSets && (
              <MetricPill
                icon={RotateCcw}
                label="sets"
                value={String(exercise.sets)}
              />
            )}
            {hasReps && (
              <MetricPill
                icon={Dumbbell}
                label="reps"
                value={String(exercise.reps)}
              />
            )}
            {hasDuration && (
              <MetricPill
                icon={Clock}
                label="sec"
                value={String(exercise.durationSec)}
              />
            )}
          </div>
          {exercise.instructions && (
            <div>
              <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-primary transition-fast"
                aria-expanded={open}
                data-ocid={`day_detail.exercise_instructions_toggle.${index + 1}`}
              >
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                {open ? "Hide" : "Show"} instructions
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-lg bg-muted/50 border border-border/60 px-3 py-2.5">
                      <p className="text-sm text-foreground leading-relaxed">
                        {exercise.instructions}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Meal helpers ─────────────────────────────────────────────────────────────

type MealTypeStr = "breakfast" | "lunch" | "dinner" | "snack";
const MEAL_ICONS: Record<MealTypeStr, React.ElementType> = {
  breakfast: Sparkles,
  lunch: Salad,
  dinner: UtensilsCrossed,
  snack: Flame,
};
const MEAL_LABELS: Record<MealTypeStr, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

// ─── Meal Card ────────────────────────────────────────────────────────────────

function MealCard({ meal, index }: { meal: BackendMeal; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const mealType = (meal.mealType as unknown as MealTypeStr) ?? "snack";
  const Icon = MEAL_ICONS[mealType] ?? Flame;
  const label = MEAL_LABELS[mealType] ?? String(mealType);
  const pillClass = `meal-pill-${mealType} fitness-badge`;
  const calories = Number(meal.macros?.calories ?? 0);
  const protein = Number(meal.macros?.proteinG ?? 0);
  const carbs = Number(meal.macros?.carbsG ?? 0);
  const fat = Number(meal.macros?.fatG ?? 0);
  const prepTime = Number(meal.prepTimeMins ?? 0);
  const servings = Number(meal.servings ?? 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`day_detail.meal_card.${index + 1}`}
    >
      <Card
        className="border border-border bg-card overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.17 155), oklch(0.76 0.12 80))",
          }}
        />
        <CardContent className="pt-4 pb-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm leading-tight truncate">
                  {meal.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={pillClass}>{label}</span>
                  {prepTime > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {prepTime} min
                    </span>
                  )}
                  {servings > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {servings} serving{servings !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {calories > 0 && (
              <span
                className="nutrition-badge nutrition-badge-calories"
                data-ocid={`day_detail.meal_calories.${index + 1}`}
              >
                🔥 {calories} kCal
              </span>
            )}
            {protein > 0 && (
              <span className="nutrition-badge nutrition-badge-protein">
                P {protein}g
              </span>
            )}
            {carbs > 0 && (
              <span className="nutrition-badge nutrition-badge-carbs">
                C {carbs}g
              </span>
            )}
            {fat > 0 && (
              <span className="nutrition-badge nutrition-badge-fat">
                F {fat}g
              </span>
            )}
          </div>
          {(meal.ingredients?.length > 0 || meal.instructions?.length > 0) && (
            <div>
              <button
                type="button"
                onClick={() => setExpanded((p) => !p)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-primary transition-fast"
                aria-expanded={expanded}
                data-ocid={`day_detail.meal_expand.${index + 1}`}
              >
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                {expanded ? "Hide" : "Show"} details
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-2.5">
                      {meal.ingredients?.length > 0 && (
                        <div className="rounded-lg bg-muted/50 border border-border/60 px-3 py-2.5">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                            Ingredients
                          </p>
                          <ul className="space-y-1">
                            {meal.ingredients.map((ing) => (
                              <li
                                key={ing}
                                className="text-sm text-foreground flex items-start gap-1.5"
                              >
                                <span className="text-primary mt-0.5 shrink-0">
                                  •
                                </span>
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {meal.instructions?.length > 0 && (
                        <div className="rounded-lg bg-muted/50 border border-border/60 px-3 py-2.5">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                            Preparation
                          </p>
                          <ol className="space-y-1.5">
                            {meal.instructions.map((step, stepIdx) => (
                              <li
                                key={step}
                                className="text-sm text-foreground flex items-start gap-2"
                              >
                                <span className="text-xs font-mono font-bold text-primary shrink-0 mt-0.5">
                                  {stepIdx + 1}.
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Step Tracking Section ────────────────────────────────────────────────────

const STEP_MILESTONES = [2000, 5000, 10000];

function StepTrackingSection() {
  const { steps, permissionGranted, isSupported, requestPermission } =
    useStepTracking();
  const [tapped, setTapped] = useState(false);

  const activeMilestone = STEP_MILESTONES.filter((m) => steps >= m).length;
  const nextMilestone = STEP_MILESTONES[activeMilestone] ?? 10000;
  const progressPct = Math.min((steps / nextMilestone) * 100, 100);

  function handlePermissionRequest() {
    setTapped(true);
    requestPermission();
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      data-ocid="day_detail.steps_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <Footprints className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
          Step Tracking
        </h2>
        <Badge variant="secondary" className="ml-auto text-xs font-mono">
          Today
        </Badge>
      </div>

      <Card
        className="border border-border bg-card overflow-hidden"
        style={{
          boxShadow:
            isSupported && permissionGranted
              ? "var(--shadow-glow-primary)"
              : "var(--shadow-card)",
        }}
      >
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.52 0.19 158), oklch(0.65 0.18 195))",
          }}
        />
        <CardContent className="pt-5 pb-5 space-y-4">
          {/* Step count display */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl font-display font-bold text-foreground tabular-nums"
                  data-ocid="day_detail.step_count"
                >
                  {!isSupported ? "—" : steps.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground font-body">
                  steps today
                </span>
              </div>
              {isSupported && permissionGranted && nextMilestone && (
                <p className="text-xs text-muted-foreground mt-1">
                  {steps < nextMilestone
                    ? `${(nextMilestone - steps).toLocaleString()} to ${nextMilestone.toLocaleString()} step milestone`
                    : "🏅 All milestones reached!"}
                </p>
              )}
            </div>
            {isSupported && permissionGranted && (
              <div className="flex items-center gap-1 shrink-0">
                {STEP_MILESTONES.map((m) => (
                  <div
                    key={m}
                    title={`${m.toLocaleString()} steps`}
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                      steps >= m
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m >= 10000 ? "10k" : m >= 5000 ? "5k" : "2k"}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {isSupported && permissionGranted && (
            <div>
              <div
                className="h-2.5 bg-muted rounded-full overflow-hidden"
                data-ocid="day_detail.step_progress"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.52 0.19 158), oklch(0.68 0.16 195), oklch(0.75 0.14 210))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                {STEP_MILESTONES.map((m) => (
                  <span
                    key={m}
                    className={`text-[10px] font-mono transition-colors duration-300 ${steps >= m ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {m >= 10000 ? "10k" : m >= 5000 ? "5k" : "2k"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Not supported */}
          {!isSupported && (
            <div
              className="flex items-center gap-2.5 rounded-xl bg-muted/60 border border-border px-4 py-3"
              data-ocid="day_detail.step_unavailable"
            >
              <Smartphone className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm text-muted-foreground">
                Step tracking unavailable on this device.
              </p>
            </div>
          )}

          {/* Permission request (iOS) */}
          {isSupported && !permissionGranted && (
            <div className="space-y-3" data-ocid="day_detail.step_permission">
              <p className="text-sm text-muted-foreground">
                Allow motion sensor access to automatically track your steps
                throughout the day.
              </p>
              <motion.button
                type="button"
                onClick={handlePermissionRequest}
                whileTap={{ scale: 0.97 }}
                disabled={tapped}
                data-ocid="day_detail.step_permission_button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                style={{ boxShadow: "var(--shadow-glow-primary)" }}
              >
                <Footprints className="h-4 w-4" />
                Enable Step Tracking
              </motion.button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}

// ─── Water Intake Section ─────────────────────────────────────────────────────

const QUICK_ADD_OPTIONS = [
  { label: "+250ml", value: 250, emoji: "🥤" },
  { label: "+500ml", value: 500, emoji: "💧" },
  { label: "+750ml", value: 750, emoji: "🫗" },
];

function WaterIntakeSection({
  flexibilityLevel,
}: { flexibilityLevel: number }) {
  const today = getTodayKey();
  const { data: tracking, isLoading } = useWaterTracking(today);
  const addWater = useAddWater();
  const clearLast = useClearLastWater();
  const [tappedBtn, setTappedBtn] = useState<number | null>(null);

  // Goal: base 2000ml + 500ml per 5 flexibility points
  const goalMl = 2000 + Math.floor(flexibilityLevel / 5) * 500;
  const current = tracking?.totalWaterMl ?? 0;
  const progressPct = Math.min((current / goalMl) * 100, 100);

  const progressColor =
    progressPct >= 100
      ? "linear-gradient(90deg, oklch(0.52 0.19 158), oklch(0.55 0.18 195))"
      : progressPct >= 60
        ? "linear-gradient(90deg, oklch(0.45 0.18 225), oklch(0.55 0.18 195))"
        : "linear-gradient(90deg, oklch(0.55 0.15 245), oklch(0.45 0.18 225))";

  function handleAdd(amount: number) {
    setTappedBtn(amount);
    addWater.mutate(
      { date: today, amountMl: amount },
      {
        onSuccess: () => {
          setTimeout(() => setTappedBtn(null), 400);
        },
        onError: () => {
          toast.error("Couldn't save water entry. Try again.");
          setTappedBtn(null);
        },
      },
    );
  }

  function handleUndo() {
    clearLast.mutate(today, {
      onError: () => toast.error("Couldn't undo last entry."),
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      data-ocid="day_detail.water_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
          Water Intake
        </h2>
        <Badge variant="secondary" className="ml-auto text-xs font-mono">
          {goalMl}ml goal
        </Badge>
      </div>

      <Card
        className="border border-border bg-card overflow-hidden"
        style={{
          boxShadow:
            progressPct >= 100
              ? "var(--shadow-glow-primary)"
              : "var(--shadow-card)",
        }}
      >
        <div className="h-1 w-full" style={{ background: progressColor }} />
        <CardContent className="pt-5 pb-5 space-y-5">
          {/* Current vs goal */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl font-display font-bold tabular-nums"
                  style={{
                    color:
                      progressPct >= 100
                        ? "oklch(var(--primary))"
                        : "oklch(var(--foreground))",
                  }}
                  data-ocid="day_detail.water_current"
                >
                  {isLoading ? "—" : current.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">ml</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isLoading
                  ? "Loading…"
                  : `of ${goalMl.toLocaleString()}ml daily goal`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span
                className="text-2xl font-display font-bold tabular-nums"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {Math.round(progressPct)}%
              </span>
              {progressPct >= 100 && (
                <p className="text-xs text-primary font-semibold">
                  Goal reached! 🎉
                </p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div
              className="h-3 bg-muted rounded-full overflow-hidden"
              data-ocid="day_detail.water_progress"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: progressColor }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground font-mono">
              <span>0ml</span>
              <span>{Math.floor(goalMl / 2)}ml</span>
              <span>{goalMl}ml</span>
            </div>
          </div>

          {/* Quick-add buttons */}
          <div
            className="grid grid-cols-3 gap-2.5"
            data-ocid="day_detail.water_quick_add"
          >
            {QUICK_ADD_OPTIONS.map((opt) => (
              <motion.button
                key={opt.value}
                type="button"
                onClick={() => handleAdd(opt.value)}
                disabled={addWater.isPending}
                whileTap={{ scale: 0.94 }}
                data-ocid={`day_detail.water_add_${opt.value}`}
                className="relative flex flex-col items-center justify-center gap-1 py-4 rounded-2xl border transition-all duration-200 font-semibold text-sm select-none"
                style={{
                  background:
                    tappedBtn === opt.value
                      ? "oklch(var(--primary) / 0.15)"
                      : "oklch(var(--muted) / 0.6)",
                  borderColor:
                    tappedBtn === opt.value
                      ? "oklch(var(--primary) / 0.5)"
                      : "oklch(var(--border))",
                  color:
                    tappedBtn === opt.value
                      ? "oklch(var(--primary))"
                      : "oklch(var(--foreground))",
                  boxShadow:
                    tappedBtn === opt.value
                      ? "var(--shadow-glow-primary)"
                      : "none",
                }}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-sm font-display font-bold">
                  {opt.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Undo last entry */}
          {(tracking?.waterEntries?.length ?? 0) > 0 && (
            <button
              type="button"
              onClick={handleUndo}
              disabled={clearLast.isPending}
              data-ocid="day_detail.water_undo_button"
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 mx-auto"
            >
              <Undo2 className="h-3.5 w-3.5" />
              {clearLast.isPending ? "Undoing…" : "Undo last entry"}
            </button>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useDayPlan(day: number) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<BackendDayPlan | null>({
    queryKey: ["dayPlan", day],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDayPlan(BigInt(day));
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

// ─── Lock Gate ────────────────────────────────────────────────────────────────

function LockGate({ dayNumber }: { dayNumber: number }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center"
        data-ocid="day_detail.locked_state"
      >
        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-muted border-2 border-border">
          <Lock className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl font-display font-bold text-foreground">
            Day {dayNumber} is locked
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Complete Day {dayNumber - 1} to unlock this workout. Keep up your
            streak — consistency builds champions! 💪
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/plan" })}
          data-ocid="day_detail.back_to_plan_button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plan
        </Button>
      </motion.div>
    </Layout>
  );
}

// ─── Mark Complete Button ─────────────────────────────────────────────────────

function MarkCompleteButton({
  dayNumber,
  isCompleted,
}: { dayNumber: number; isCompleted: boolean }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useMarkDayComplete();

  function handleComplete() {
    mutate(dayNumber, {
      onSuccess: () => {
        toast.success(`🎉 Day ${dayNumber} Complete! Keep it up!`, {
          duration: 4000,
          className: "success-pop",
        });
        setTimeout(() => navigate({ to: "/plan" }), 1500);
      },
      onError: (err: Error) => {
        toast.error(err.message ?? "Couldn't mark day complete. Try again.");
      },
    });
  }

  if (isCompleted) {
    return (
      <div
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary font-semibold text-sm"
        data-ocid="day_detail.completed_state"
      >
        <CheckCircle2 className="h-4 w-4" />
        Completed!
      </div>
    );
  }

  return (
    <Button
      onClick={handleComplete}
      disabled={isPending}
      data-ocid="day_detail.mark_complete_button"
      className="px-6"
    >
      {isPending ? (
        <>
          <span className="h-4 w-4 border-2 border-primary-foreground/60 border-t-primary-foreground rounded-full animate-spin mr-2 shrink-0" />
          Saving…
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Mark Day {dayNumber} Complete
        </>
      )}
    </Button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DayDetailPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams({ from: "/plan/$day" });
  const dayNumber = Number.parseInt(params.day, 10);

  const { isDayAccessible, isDayCompleted, isDeveloper } = useDerivedProgress();
  const accessible = isDayAccessible(dayNumber);
  const completed = isDayCompleted(dayNumber);

  const { data: profile } = useUserProfile();
  const flexibilityLevel = profile?.flexibilityLevel ?? 1;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, authLoading, navigate]);

  const { data: plan, isLoading: planLoading } = useDayPlan(dayNumber);

  if (authLoading || planLoading) {
    return (
      <Layout>
        <div
          className="flex-1 flex items-center justify-center p-8"
          data-ocid="day_detail.loading_state"
        >
          <PageLoader label="Loading workout…" />
        </div>
      </Layout>
    );
  }

  if (!accessible && !isDeveloper) return <LockGate dayNumber={dayNumber} />;

  if (!plan) {
    return (
      <Layout>
        <div
          className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center"
          data-ocid="day_detail.empty_state"
        >
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-muted">
            <Flame className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold">Day not found</h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Day {dayNumber} doesn't exist in your 30-day plan.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/plan" })}
            data-ocid="day_detail.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Plan
          </Button>
        </div>
      </Layout>
    );
  }

  const gradient = getFocusGradient(plan.focus);
  const FocusIcon = getFocusIcon(plan.focus);
  const meals = plan.meals ?? [];

  return (
    <Layout>
      <div className="min-h-full bg-background" data-ocid="day_detail.page">
        {/* ── Gradient hero header ─────────────────────────────────────── */}
        <div style={{ background: gradient }}>
          <div className="max-w-3xl mx-auto px-4 pt-4 pb-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/plan" })}
              aria-label="Back to plan"
              data-ocid="day_detail.back_button"
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-fast bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            {isDeveloper && (
              <span className="text-xs font-mono font-bold text-white/60 bg-white/10 rounded px-2 py-0.5 tracking-widest">
                DEV
              </span>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto px-4 pt-5 pb-7"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-widest">
                Day {Number(plan.day)} · {plan.focus}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              {plan.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-white/80 text-sm">
              <div className="flex items-center gap-1.5">
                <FocusIcon className="h-4 w-4" />
                <span>
                  {plan.exercises.length} exercise
                  {plan.exercises.length !== 1 ? "s" : ""}
                </span>
              </div>
              {meals.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>{meals.length} meals planned</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Completion banner ─────────────────────────────────────────── */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="max-w-3xl mx-auto px-4 pt-4"
          >
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-primary/10 border border-primary/25"
              data-ocid="day_detail.completed_banner"
            >
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 success-pop" />
              <p className="text-sm font-semibold text-primary">
                You completed this day! Great work — keep the streak going! 🔥
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
          {/* Exercises section */}
          <section data-ocid="day_detail.exercises_section">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
                Workout Exercises
              </h2>
              <Badge variant="secondary" className="ml-auto text-xs font-mono">
                {plan.exercises.length}
              </Badge>
            </div>
            <AnimatePresence>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-ocid="day_detail.exercise_list"
              >
                {plan.exercises.map((exercise, i) => (
                  <ExerciseCard
                    key={`${exercise.name}-${i}`}
                    exercise={exercise}
                    index={i}
                  />
                ))}
              </div>
            </AnimatePresence>
          </section>

          {/* Step Tracking section */}
          <StepTrackingSection />

          {/* Water Intake section */}
          <WaterIntakeSection flexibilityLevel={flexibilityLevel} />

          {/* Diet / Nutrition section */}
          {meals.length > 0 && (
            <section data-ocid="day_detail.nutrition_section">
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
                  Today's Nutrition Plan
                </h2>
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs font-mono"
                >
                  {meals.length} meals
                </Badge>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-muted/60 border border-border"
                data-ocid="day_detail.nutrition_summary"
              >
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-full mb-1">
                  Daily Totals
                </span>
                {(() => {
                  const totals = meals.reduce(
                    (acc, m) => ({
                      cal: acc.cal + Number(m.macros?.calories ?? 0),
                      p: acc.p + Number(m.macros?.proteinG ?? 0),
                      c: acc.c + Number(m.macros?.carbsG ?? 0),
                      f: acc.f + Number(m.macros?.fatG ?? 0),
                    }),
                    { cal: 0, p: 0, c: 0, f: 0 },
                  );
                  return (
                    <>
                      {totals.cal > 0 && (
                        <span className="nutrition-badge nutrition-badge-calories">
                          🔥 {totals.cal} kCal
                        </span>
                      )}
                      {totals.p > 0 && (
                        <span className="nutrition-badge nutrition-badge-protein">
                          P {totals.p}g
                        </span>
                      )}
                      {totals.c > 0 && (
                        <span className="nutrition-badge nutrition-badge-carbs">
                          C {totals.c}g
                        </span>
                      )}
                      {totals.f > 0 && (
                        <span className="nutrition-badge nutrition-badge-fat">
                          F {totals.f}g
                        </span>
                      )}
                    </>
                  );
                })()}
              </motion.div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-ocid="day_detail.meal_list"
              >
                {meals.map((meal, i) => (
                  <MealCard key={`${meal.name}-${i}`} meal={meal} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Mark Complete CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: plan.exercises.length * 0.08 + 0.3,
              duration: 0.4,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-2"
          >
            {accessible && (
              <MarkCompleteButton
                dayNumber={dayNumber}
                isCompleted={completed}
              />
            )}
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/plan" })}
              data-ocid="day_detail.return_plan_button"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to 30-Day Plan
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
