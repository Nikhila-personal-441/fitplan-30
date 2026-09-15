import { createActor } from "@/backend";
import type { DailyTrackingSummary as BackendSummary } from "@/backend.d";
import type { DailyTrackingSummary } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function getTodayDateKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function mapSummary(raw: BackendSummary): DailyTrackingSummary {
  return {
    date: raw.date,
    totalWaterMl: Number(raw.totalWaterMl),
    waterGoalMl: Number(raw.waterGoalMl),
    waterEntries: raw.waterEntries.map((e) => ({
      timestamp: e.timestamp,
      amountMl: Number(e.amountMl),
    })),
    steps: Number(raw.steps),
    lastUpdated: raw.lastUpdated,
  };
}

// ─── Query ──────────────────────────────────────────────────────────────────

export function useWaterTracking(date?: string) {
  const dateKey = date ?? getTodayDateKey();
  const { actor, isFetching } = useActor(createActor);

  return useQuery<DailyTrackingSummary>({
    queryKey: ["waterTracking", dateKey],
    queryFn: async () => {
      if (!actor) {
        return {
          date: dateKey,
          totalWaterMl: 0,
          waterGoalMl: 2000,
          waterEntries: [],
          steps: 0,
          lastUpdated: BigInt(0),
        };
      }
      const raw = await actor.getWaterIntake(dateKey);
      return mapSummary(raw);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useAddWater() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      date,
      amountMl,
    }: { date?: string; amountMl: number }) => {
      if (!actor) throw new Error("Actor not ready");
      const dateKey = date ?? getTodayDateKey();
      await actor.addWaterEntry(dateKey, BigInt(amountMl));
      return dateKey;
    },
    onSuccess: (dateKey) => {
      queryClient.invalidateQueries({ queryKey: ["waterTracking", dateKey] });
    },
  });
}

export function useClearLastWater() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (date?: string) => {
      if (!actor) throw new Error("Actor not ready");
      const dateKey = date ?? getTodayDateKey();
      await actor.clearLastWaterEntry(dateKey);
      return dateKey;
    },
    onSuccess: (dateKey) => {
      queryClient.invalidateQueries({ queryKey: ["waterTracking", dateKey] });
    },
  });
}
