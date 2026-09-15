export type FitnessTrack = "beginner" | "intermediate" | "advanced";

export interface WaterEntry {
  timestamp: bigint;
  amountMl: number;
}

export interface DailyStepCount {
  date: string;
  steps: number;
  lastUpdated: bigint;
}

export interface DailyTrackingSummary {
  date: string;
  totalWaterMl: number;
  waterGoalMl: number;
  waterEntries: WaterEntry[];
  steps: number;
  lastUpdated: bigint;
}

export interface UserProfile {
  principal: string;
  email: string;
  phone: string;
  age: number;
  weightKg: number;
  heightCm: number;
  healthIssues: string;
  flexibilityLevel: number;
  dietaryRestrictions: string;
  fitnessTrack: FitnessTrack;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ProfileInput {
  email: string;
  phone: string;
  age: bigint;
  weightKg: number;
  heightCm: number;
  healthIssues: string;
  flexibilityLevel: bigint;
  dietaryRestrictions: string;
}

export interface Exercise {
  name: string;
  description: string;
  sets: bigint;
  reps: bigint;
  durationSec: bigint;
  instructions: string;
  difficulty: string;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface Macros {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface Meal {
  name: string;
  mealType: MealType;
  ingredients: string[];
  macros: Macros;
  prepTimeMins: number;
  servings: number;
  instructions: string[];
}

export interface DayPlan {
  day: bigint;
  title: string;
  focus: string;
  exercises: Exercise[];
  meals?: Meal[];
}

export interface UserProgress {
  principal: string;
  completedDays: number[];
  lastCompletedDay: number | null;
  isDeveloper: boolean;
  fitnessTrack: FitnessTrack;
}

export type DifficultyLevel = "Easy" | "Moderate" | "Hard";

export type AuthStatus = "initializing" | "anonymous" | "authenticated";
