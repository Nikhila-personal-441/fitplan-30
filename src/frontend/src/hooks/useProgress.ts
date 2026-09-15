import { createActor } from "@/backend";
import type { UserProgress } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

type BackendActor = {
  getMyProgress: () => Promise<{
    principal: { toText?: () => string; toString?: () => string } | string;
    completedDays: bigint[];
    lastCompletedDay: [] | [bigint];
    isDeveloper: boolean;
  }>;
  markDayComplete: (day: bigint) => Promise<{ ok: string } | { err: string }>;
  setDeveloperMode: (code: string) => Promise<{ ok: string } | { err: string }>;
};

function parseProgress(raw: {
  principal: { toText?: () => string; toString?: () => string } | string;
  completedDays: bigint[];
  lastCompletedDay: [] | [bigint];
  isDeveloper: boolean;
}): UserProgress {
  const principalStr =
    typeof raw.principal === "string"
      ? raw.principal
      : typeof raw.principal.toText === "function"
        ? raw.principal.toText()
        : String(raw.principal);

  const completedDays = (raw.completedDays ?? []).map((d) => Number(d));
  const rawLast = raw.lastCompletedDay;
  let lastCompletedDay: number | null = null;
  if (Array.isArray(rawLast)) {
    lastCompletedDay = rawLast.length > 0 ? Number(rawLast[0]) : null;
  } else if (typeof rawLast === "bigint") {
    lastCompletedDay = Number(rawLast);
  }

  return {
    principal: principalStr,
    completedDays,
    lastCompletedDay,
    isDeveloper: raw.isDeveloper ?? false,
    fitnessTrack: "beginner" as const,
  };
}

export function useMyProgress() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<UserProgress | null>({
    queryKey: ["myProgress"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const raw = await (actor as unknown as BackendActor).getMyProgress();
        return parseProgress(raw);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 10_000,
  });
}

export function useMarkDayComplete() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<string, Error, number>({
    mutationFn: async (day: number) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (actor as unknown as BackendActor).markDayComplete(
        BigInt(day),
      );
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
    },
  });
}

export function useSetDeveloperMode() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (actor as unknown as BackendActor).setDeveloperMode(
        code,
      );
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
    },
  });
}

/**
 * Derived: which day is currently "active" (lowest incomplete in 1-30 range).
 * Developers see all days unlocked; regular users only up to next incomplete day.
 */
export function useDerivedProgress() {
  const { data: progress } = useMyProgress();

  const isDeveloper = progress?.isDeveloper ?? false;
  const completedDays = progress?.completedDays ?? [];

  // currentDay = lowest day number in 1-30 that is NOT completed
  let currentDay = 1;
  for (let d = 1; d <= 30; d++) {
    if (!completedDays.includes(d)) {
      currentDay = d;
      break;
    }
  }
  // If all 30 completed, currentDay stays 30 (challenge finished)
  if (completedDays.length >= 30) currentDay = 30;

  function isDayAccessible(day: number): boolean {
    if (isDeveloper) return true;
    if (completedDays.includes(day)) return true;
    return day === currentDay;
  }

  function isDayCompleted(day: number): boolean {
    return completedDays.includes(day);
  }

  function isMilestone(day: number): boolean {
    return [7, 14, 21, 30].includes(day);
  }

  return {
    isDeveloper,
    completedDays,
    currentDay,
    isDayAccessible,
    isDayCompleted,
    isMilestone,
    progress,
  };
}
