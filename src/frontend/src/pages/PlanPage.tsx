import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  useDerivedProgress,
  useMyProgress,
  useSetDeveloperMode,
} from "@/hooks/useProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import type { DayPlan } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Dumbbell,
  Flame,
  Lock,
  Play,
  Settings,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Milestone config ────────────────────────────────────────────────────────
const MILESTONE_LABELS: Record<number, string> = {
  7: "Week 1 Warrior",
  14: "Halfway Hero",
  21: "3 Weeks Strong",
  30: "30-Day Legend",
};

// ─── React Query hook ─────────────────────────────────────────────────────────
function useAllDayPlans() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<DayPlan[]>({
    queryKey: ["allDayPlans"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as { getAllDayPlans: () => Promise<DayPlan[]> }
      ).getAllDayPlans();
      return result;
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

// ─── Skeleton tile ────────────────────────────────────────────────────────────
function SkeletonTile({ index }: { index: number }) {
  return (
    <div
      className="shimmer rounded-2xl"
      style={{
        height: "clamp(88px, 12vw, 120px)",
        animationDelay: `${index * 0.04}s`,
      }}
    />
  );
}

// ─── Developer badge ─────────────────────────────────────────────────────────
function DevBadge() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase"
      data-ocid="plan.dev_badge"
    >
      <ShieldCheck className="w-3 h-3" />
      DEV
    </motion.span>
  );
}

// ─── Developer mode dialog ───────────────────────────────────────────────────
function DevModeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: setDevMode, isPending } = useSetDeveloperMode();

  useEffect(() => {
    if (open) {
      setCode("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    try {
      await setDevMode(code.trim());
      toast.success("Developer mode enabled — all 30 days unlocked!", {
        duration: 4000,
      });
      onOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Invalid developer code",
        { duration: 4000 },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" data-ocid="dev_mode.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Developer Access
          </DialogTitle>
          <DialogDescription className="font-body text-sm">
            Enter the developer code to unlock all 30 days.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
          <Input
            ref={inputRef}
            type="password"
            placeholder="Developer code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isPending}
            data-ocid="dev_mode.input"
            autoComplete="off"
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-ocid="dev_mode.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!code.trim() || isPending}
              data-ocid="dev_mode.submit_button"
            >
              {isPending ? "Verifying…" : "Unlock"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LockedTooltip({
  day,
  visible,
}: {
  day: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div className="bg-foreground text-background text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
            Complete Day {day - 1} to unlock
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Day Tile ─────────────────────────────────────────────────────────────────
interface DayTileProps {
  plan: DayPlan;
  tileState: "completed" | "current" | "locked";
  isAccessible: boolean;
  isDev: boolean;
  isMilestone: boolean;
  onClick: () => void;
  index: number;
}

function DayTile({
  plan,
  tileState,
  isAccessible,
  isDev,
  isMilestone,
  onClick,
  index,
}: DayTileProps) {
  const day = Number(plan.day);
  const exerciseCount = plan.exercises.length;
  const milestoneLabel = MILESTONE_LABELS[day];
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (!isAccessible) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    onClick();
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
    >
      {/* Milestone glow ring behind the tile */}
      {isMilestone && tileState !== "locked" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-transparent -z-10 blur-sm scale-110" />
      )}

      <LockedTooltip day={day} visible={showTooltip} />

      <button
        type="button"
        onClick={handleClick}
        aria-label={
          isAccessible
            ? `Day ${day}: ${plan.focus}`
            : `Day ${day} locked — complete Day ${day - 1} first`
        }
        aria-disabled={!isAccessible}
        data-ocid={`plan.tile.${day}`}
        className={cn(
          "relative w-full flex flex-col items-center justify-center rounded-2xl p-3 text-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "select-none border transition-all duration-200",
          // Current day
          tileState === "current" && [
            "tile-active tile-hover",
            "bg-card text-foreground border-primary",
          ],
          // Completed day
          tileState === "completed" && [
            "tile-completed tile-hover",
            "bg-card text-foreground",
          ],
          // Locked
          tileState === "locked" && [
            "tile-locked",
            isAccessible &&
              "!opacity-100 !grayscale-0 !cursor-pointer tile-hover",
          ],
        )}
        style={{
          minHeight: "clamp(88px, 12vw, 120px)",
          boxShadow:
            tileState === "current"
              ? "var(--shadow-glow-primary)"
              : tileState === "completed"
                ? "var(--shadow-card)"
                : undefined,
        }}
      >
        {/* Developer overlay badge on each dev-accessible tile */}
        {isDev && tileState === "locked" && (
          <span className="absolute top-1.5 left-1.5 text-[7px] font-mono font-bold text-primary/60 leading-none z-10">
            DEV
          </span>
        )}

        {/* Status icon — top right */}
        <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5">
          {tileState === "completed" && (
            <CheckCircle2
              className="w-4 h-4 text-green-500"
              strokeWidth={2.5}
            />
          )}
          {tileState === "current" && (
            <Play
              className="w-3.5 h-3.5 text-primary fill-primary"
              strokeWidth={0}
            />
          )}
          {tileState === "locked" && !isAccessible && (
            <Lock className="w-3 h-3 text-muted-foreground/50" />
          )}
          {tileState === "locked" && isAccessible && (
            <Play
              className="w-3.5 h-3.5 text-primary/70 fill-primary/70"
              strokeWidth={0}
            />
          )}
        </span>

        {/* Day label micro */}
        <span
          className={cn(
            "block font-display font-semibold uppercase tracking-[0.15em] leading-none mb-0.5 text-[9px]",
            tileState === "current" && "text-primary",
            tileState === "completed" && "text-green-500/80",
            tileState === "locked" && "text-muted-foreground/50",
          )}
        >
          DAY
        </span>

        {/* Day number */}
        <span
          className={cn(
            "block font-display font-black leading-none",
            "text-2xl sm:text-3xl",
            tileState === "current" && "text-foreground",
            tileState === "completed" && "text-foreground/80",
            tileState === "locked" && "text-foreground/40",
          )}
        >
          {day}
        </span>

        {/* Focus name — visible on sm+ */}
        {plan.focus && (
          <span
            className={cn(
              "hidden sm:block mt-1 text-[9px] font-semibold leading-tight truncate w-full px-1",
              tileState === "current" && "text-primary/80",
              tileState === "completed" && "text-muted-foreground",
              tileState === "locked" && "text-muted-foreground/40",
            )}
          >
            {plan.focus}
          </span>
        )}

        {/* Exercise count pill */}
        <span
          className={cn(
            "mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide",
            tileState === "current" && "bg-primary/15 text-primary",
            tileState === "completed" && "bg-green-500/10 text-green-500/80",
            tileState === "locked" && "bg-muted text-muted-foreground/40",
          )}
        >
          {exerciseCount} ex
        </span>

        {/* Today badge */}
        {tileState === "current" && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
            Today
          </span>
        )}
      </button>

      {/* Milestone badge — floats below tile */}
      {isMilestone && milestoneLabel && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
          <span className="milestone-badge text-[7px] whitespace-nowrap px-1.5 py-0.5">
            {milestoneLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Progress header ──────────────────────────────────────────────────────────
interface ProgressHeaderProps {
  firstName: string;
  completedCount: number;
  totalDays: number;
  isDeveloper: boolean;
  streakDays: number;
}

function ProgressHeader({
  firstName,
  completedCount,
  totalDays,
  isDeveloper,
  streakDays,
}: ProgressHeaderProps) {
  const pct = Math.round((completedCount / totalDays) * 100);

  const milestoneMarkers = [
    { pct: (7 / 30) * 100, label: "W1" },
    { pct: (14 / 30) * 100, label: "½" },
    { pct: (21 / 30) * 100, label: "W3" },
    { pct: 100, label: "🏆" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border-b border-border px-4 sm:px-6 py-5"
      data-ocid="plan.progress_header"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
                {firstName ? `Hey ${firstName} 👋` : "Your 30-Day Plan"}
              </h1>
              {isDeveloper && <DevBadge />}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5 font-body">
              {completedCount === 0
                ? "Start your journey — every rep counts!"
                : completedCount < 15
                  ? "Keep going — you're building momentum!"
                  : completedCount < 28
                    ? "Incredible consistency — you're almost there!"
                    : "You're a champion — finish strong!"}
            </p>
          </div>

          {/* Stats cluster */}
          <div className="flex items-center gap-4 shrink-0 ml-4">
            {streakDays > 0 && (
              <div className="text-center hidden sm:block">
                <span className="flex items-center gap-0.5 font-display font-bold text-xl text-accent leading-none streak-pulse">
                  <Flame className="w-4 h-4" />
                  {streakDays}
                </span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
                  streak
                </p>
              </div>
            )}
            <div className="text-right">
              <span className="font-display font-bold text-3xl text-primary leading-none">
                {completedCount}
              </span>
              <span className="font-display text-sm text-muted-foreground font-medium">
                /{totalDays}
              </span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
                days done
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(var(--primary)), oklch(var(--accent)))",
            }}
          />
          {milestoneMarkers.map((m) => (
            <span
              key={m.pct}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-background transition-all duration-500",
                pct >= m.pct ? "bg-accent scale-125" : "bg-border scale-100",
              )}
              style={{ left: `${m.pct}%` }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Milestone labels */}
        <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-widest">
          <span className="text-muted-foreground">Start</span>
          <span
            className={cn(
              "transition-colors",
              pct >= (7 / 30) * 100
                ? "text-primary"
                : "text-muted-foreground/50",
            )}
          >
            Wk 1
          </span>
          <span
            className={cn(
              "transition-colors",
              pct >= (14 / 30) * 100
                ? "text-accent"
                : "text-muted-foreground/50",
            )}
          >
            Halfway
          </span>
          <span
            className={cn(
              "transition-colors",
              pct >= (21 / 30) * 100
                ? "text-primary"
                : "text-muted-foreground/50",
            )}
          >
            Wk 3
          </span>
          <span
            className={cn(
              "transition-colors flex items-center gap-0.5",
              pct >= 100 ? "text-accent" : "text-muted-foreground/50",
            )}
          >
            <Trophy className="w-3 h-3" />
            Done
          </span>
        </div>

        {/* Completed milestone callout */}
        {pct > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 1, duration: 0.3 }}
            className="mt-3"
          >
            {completedCount >= 30 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20">
                <Trophy className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs font-bold text-accent">
                  🎉 You completed the 30-Day Challenge!
                </span>
              </div>
            )}
            {completedCount >= 21 && completedCount < 30 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/8 border border-primary/15">
                <Flame className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-primary">
                  3 Weeks Strong! Only {30 - completedCount} days to go!
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Legend ──────────────────────────────────────────────────────────────────
function GridLegend() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[11px] text-muted-foreground font-body"
      data-ocid="plan.legend"
    >
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-lg border border-green-500/40 bg-card flex items-center justify-center">
          <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
        </span>
        Completed
      </span>
      <span className="flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-lg border border-primary bg-card"
          style={{ boxShadow: "0 0 6px oklch(var(--primary)/0.4)" }}
        />
        Today
      </span>
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-lg border border-border bg-muted flex items-center justify-center">
          <Lock className="w-2.5 h-2.5 text-muted-foreground/40" />
        </span>
        Locked
      </span>
      <span className="flex items-center gap-2">
        <span className="milestone-badge text-[8px] px-1.5 py-0.5">
          Milestone
        </span>
      </span>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyPlan() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="plan.empty_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Dumbbell className="w-8 h-8 text-primary" />
      </div>
      <h2 className="font-display font-bold text-xl text-foreground mb-2">
        Plan not ready yet
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs font-body">
        Your 30-day workout plan is being prepared. Check back shortly!
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PlanPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useUserProfile();
  const { data: plans = [], isLoading: plansLoading } = useAllDayPlans();
  const { isLoading: progressLoading } = useMyProgress();
  const [devModalOpen, setDevModalOpen] = useState(false);

  const {
    isDeveloper,
    completedDays,
    currentDay,
    isDayAccessible,
    isDayCompleted,
    isMilestone,
  } = useDerivedProgress();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const firstName = profile?.email?.split("@")[0] ?? "";
  const completedCount = completedDays.length;
  const totalDays = 30;

  // Simple streak calc: count consecutive completed days ending at the latest completed
  const streakDays = (() => {
    if (completedDays.length === 0) return 0;
    const sorted = [...completedDays].sort((a, b) => b - a);
    let streak = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0 || sorted[i - 1] - sorted[i] === 1) streak++;
      else break;
    }
    return streak;
  })();

  const isLoading = authLoading || plansLoading || progressLoading;

  // Derive tile state for each day
  function getTileState(day: number): "completed" | "current" | "locked" {
    if (isDayCompleted(day)) return "completed";
    if (day === currentDay) return "current";
    return "locked";
  }

  return (
    <Layout>
      <DevModeDialog open={devModalOpen} onOpenChange={setDevModalOpen} />

      {/* Progress header — shown once data available */}
      {!isLoading && plans.length > 0 && (
        <ProgressHeader
          firstName={firstName}
          completedCount={completedCount}
          totalDays={totalDays}
          isDeveloper={isDeveloper}
          streakDays={streakDays}
        />
      )}

      {/* Main content */}
      <section
        className="flex-1 bg-background px-4 sm:px-6 py-6 sm:py-8"
        data-ocid="plan.page"
      >
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <>
              {/* Skeleton header strip */}
              <div className="shimmer h-8 w-48 rounded-lg mb-5" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 30 }, (_, i) => (
                  <SkeletonTile key={`skel-${i + 1}`} index={i} />
                ))}
              </div>
            </>
          ) : plans.length === 0 ? (
            <EmptyPlan />
          ) : (
            <>
              {/* Grid heading */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
              >
                <div>
                  <h2
                    className="font-display font-bold text-lg text-foreground"
                    data-ocid="plan.grid_heading"
                  >
                    30-Day Workout Plan
                  </h2>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-body">
                    {isDeveloper
                      ? "Developer mode — all days unlocked"
                      : `Day ${currentDay} is your next workout`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {completedCount > 0 && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      {completedCount} done
                    </span>
                  )}
                  {!isDeveloper && (
                    <button
                      type="button"
                      onClick={() => setDevModalOpen(true)}
                      aria-label="Developer mode settings"
                      title="Developer mode"
                      data-ocid="plan.dev_mode_open_modal_button"
                      className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* The grid — extra bottom padding for milestone badges */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-8"
                data-ocid="plan.grid"
              >
                {plans.map((plan, index) => {
                  const day = Number(plan.day);
                  const tileState = getTileState(day);
                  const accessible = isDayAccessible(day);

                  return (
                    <DayTile
                      key={day}
                      plan={plan}
                      tileState={tileState}
                      isAccessible={accessible}
                      isDev={isDeveloper}
                      isMilestone={isMilestone(day)}
                      index={index}
                      onClick={() =>
                        navigate({
                          to: "/plan/$day",
                          params: { day: String(day) },
                        })
                      }
                    />
                  );
                })}
              </div>

              <GridLegend />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
