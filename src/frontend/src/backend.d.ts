import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Meal {
    prepTimeMins: bigint;
    name: string;
    instructions: Array<string>;
    macros: Macros;
    servings: bigint;
    ingredients: Array<string>;
    mealType: MealType;
}
export interface Exercise {
    difficulty: string;
    name: string;
    reps: bigint;
    sets: bigint;
    description: string;
    instructions: string;
    durationSec: bigint;
}
export type Timestamp = bigint;
export type DateKey = string;
export type FlexibilityLevel = bigint;
export interface DailyStepCount {
    date: DateKey;
    lastUpdated: Timestamp;
    steps: bigint;
}
export interface UserProgress {
    completedDays: Array<bigint>;
    principal: Principal;
    lastCompletedDay?: bigint;
    fitnessTrack: FitnessTrack;
    isDeveloper: boolean;
}
export interface DayPlan {
    day: bigint;
    focus: string;
    meals: Array<Meal>;
    title: string;
    exercises: Array<Exercise>;
}
export interface WaterEntry {
    amountMl: bigint;
    timestamp: Timestamp;
}
export interface Macros {
    fatG: bigint;
    calories: bigint;
    carbsG: bigint;
    proteinG: bigint;
}
export interface DailyTrackingSummary {
    date: DateKey;
    lastUpdated: Timestamp;
    waterEntries: Array<WaterEntry>;
    steps: bigint;
    totalWaterMl: bigint;
    waterGoalMl: bigint;
}
export interface UserProfile {
    age: bigint;
    principal: Principal;
    heightCm: number;
    createdAt: Timestamp;
    email: string;
    updatedAt: Timestamp;
    weightKg: number;
    flexibilityLevel: FlexibilityLevel;
    dietaryRestrictions: string;
    fitnessTrack: FitnessTrack;
    phone: string;
    healthIssues: string;
}
export interface ProfileInput {
    age: bigint;
    heightCm: number;
    email: string;
    weightKg: number;
    flexibilityLevel: FlexibilityLevel;
    dietaryRestrictions: string;
    phone: string;
    healthIssues: string;
}
export enum FitnessTrack {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export enum MealType {
    breakfast = "breakfast",
    lunch = "lunch",
    snack = "snack",
    dinner = "dinner"
}
export interface backendInterface {
    addWaterEntry(date: string, amountMl: bigint): Promise<void>;
    clearLastWaterEntry(date: string): Promise<void>;
    getAllDayPlans(): Promise<Array<DayPlan>>;
    getDailyTrackingSummary(date: string): Promise<DailyTrackingSummary>;
    getDayPlan(day: bigint): Promise<DayPlan | null>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyProgress(): Promise<UserProgress>;
    getStepCount(date: string): Promise<DailyStepCount>;
    getWaterIntake(date: string): Promise<DailyTrackingSummary>;
    hasCompletedOnboarding(): Promise<boolean>;
    markDayComplete(day: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveProfile(input: ProfileInput): Promise<UserProfile>;
    saveStepCount(date: string, steps: bigint): Promise<void>;
    setDeveloperMode(code: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
