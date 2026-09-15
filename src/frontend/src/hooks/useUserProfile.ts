import { createActor } from "@/backend";
import type { ProfileInput, UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

function toUserProfile(raw: Record<string, unknown>): UserProfile {
  const flexLevel = Number(raw.flexibilityLevel);
  const fitnessTrack =
    flexLevel <= 2 ? "beginner" : flexLevel === 3 ? "intermediate" : "advanced";
  return {
    principal: String(raw.principal),
    email: String(raw.email),
    phone: String(raw.phone),
    age: Number(raw.age),
    weightKg: Number(raw.weightKg),
    heightCm: Number(raw.heightCm),
    healthIssues: String(raw.healthIssues),
    flexibilityLevel: flexLevel,
    dietaryRestrictions: String(raw.dietaryRestrictions),
    fitnessTrack: fitnessTrack as UserProfile["fitnessTrack"],
    createdAt: BigInt(String(raw.createdAt)),
    updatedAt: BigInt(String(raw.updatedAt)),
  };
}

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as { getMyProfile: () => Promise<unknown[]> }
      ).getMyProfile();
      const arr = result as unknown[];
      if (!arr || arr.length === 0) return null;
      return toUserProfile(arr[0] as Record<string, unknown>);
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useHasCompletedOnboarding() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<boolean>({
    queryKey: ["hasCompletedOnboarding"],
    queryFn: async () => {
      if (!actor) return false;
      return (
        actor as unknown as { hasCompletedOnboarding: () => Promise<boolean> }
      ).hasCompletedOnboarding();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, ProfileInput>({
    mutationFn: async (input: ProfileInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          saveProfile: (i: ProfileInput) => Promise<unknown>;
        }
      ).saveProfile(input);
      return toUserProfile(result as Record<string, unknown>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["hasCompletedOnboarding"] });
    },
  });
}
