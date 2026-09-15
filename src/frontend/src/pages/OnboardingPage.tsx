import { Button } from "@/components/AppButton";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useHasCompletedOnboarding,
  useSaveProfile,
} from "@/hooks/useUserProfile";
import type { FitnessTrack, ProfileInput } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Dumbbell, Flame, Leaf } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  email: string;
  phone: string;
  age: string;
  weightKg: string;
  heightCm: string;
  healthIssues: string;
  flexibilityLevel: string;
  dietaryRestrictions: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

// ── Constants ────────────────────────────────────────────────────────────────

const FLEXIBILITY_OPTIONS = [
  { value: "1", label: "1 — Very Low (rarely active)" },
  { value: "2", label: "2 — Low (light activity occasionally)" },
  { value: "3", label: "3 — Medium (moderate regular activity)" },
  { value: "4", label: "4 — High (active most days)" },
  { value: "5", label: "5 — Very High (athlete-level fitness)" },
];

const STEPS = [
  { title: "Personal Info", description: "Tell us a bit about yourself" },
  { title: "Body Metrics", description: "Help us calibrate your workouts" },
  { title: "Health & Diet", description: "Personalise your safety profile" },
];

// ── Fitness track derivation ──────────────────────────────────────────────────

type TrackInfo = {
  track: FitnessTrack;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  borderClass: string;
  bgClass: string;
};

const TRACK_MAP: Record<string, TrackInfo> = {
  "1": {
    track: "beginner",
    label: "Beginner",
    description: "I'm new to fitness or recovering",
    icon: Leaf,
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-400/50",
    bgClass: "bg-emerald-400/10",
  },
  "2": {
    track: "beginner",
    label: "Beginner",
    description: "I'm new to fitness or recovering",
    icon: Leaf,
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-400/50",
    bgClass: "bg-emerald-400/10",
  },
  "3": {
    track: "intermediate",
    label: "Intermediate",
    description: "I exercise occasionally",
    icon: Dumbbell,
    colorClass: "text-primary",
    borderClass: "border-primary/50",
    bgClass: "bg-primary/10",
  },
  "4": {
    track: "advanced",
    label: "Advanced",
    description: "I'm experienced and want a challenge",
    icon: Flame,
    colorClass: "text-orange-400",
    borderClass: "border-orange-400/50",
    bgClass: "bg-orange-400/10",
  },
  "5": {
    track: "advanced",
    label: "Advanced",
    description: "I'm experienced and want a challenge",
    icon: Flame,
    colorClass: "text-orange-400",
    borderClass: "border-orange-400/50",
    bgClass: "bg-orange-400/10",
  },
};

function getDerivedTrack(flexibilityLevel: string): TrackInfo | null {
  return TRACK_MAP[flexibilityLevel] ?? null;
}

// ── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (step === 0) {
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email address";
    if (!form.phone.trim() || !/^\+?[\d\s\-()\\.]{7,15}$/.test(form.phone))
      errors.phone = "Enter a valid phone number";
  }
  if (step === 1) {
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 13 || age > 120)
      errors.age = "Age must be between 13 and 120";
    const wt = Number(form.weightKg);
    if (!form.weightKg || Number.isNaN(wt) || wt < 20 || wt > 500)
      errors.weightKg = "Weight must be between 20 and 500 kg";
    const ht = Number(form.heightCm);
    if (!form.heightCm || Number.isNaN(ht) || ht < 50 || ht > 280)
      errors.heightCm = "Height must be between 50 and 280 cm";
    if (!form.flexibilityLevel)
      errors.flexibilityLevel = "Please select your fitness level";
  }
  return errors;
}

// ── Fitness Track Badge ───────────────────────────────────────────────────────

function FitnessTrackBadge({ flexibilityLevel }: { flexibilityLevel: string }) {
  const info = getDerivedTrack(flexibilityLevel);
  if (!info) return null;
  const Icon = info.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={info.track}
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${info.borderClass} ${info.bgClass}`}
        data-ocid="onboarding.fitness_track_badge"
        style={{
          boxShadow:
            info.track === "advanced"
              ? "0 0 18px oklch(0.65 0.22 40 / 0.18)"
              : info.track === "intermediate"
                ? "0 0 18px oklch(var(--primary) / 0.18)"
                : "0 0 18px oklch(0.65 0.18 155 / 0.14)",
        }}
      >
        <div
          className={`mt-0.5 flex items-center justify-center h-8 w-8 rounded-xl shrink-0 ${info.bgClass} border ${info.borderClass}`}
        >
          <Icon className={`h-4 w-4 ${info.colorClass}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
            Your exercise track
          </p>
          <p className={`font-display font-bold text-base ${info.colorClass}`}>
            {info.label}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {info.description}
          </p>
          <p
            className="text-xs font-medium mt-1.5"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Based on your flexibility level, you will follow the{" "}
            <span className={`font-bold ${info.colorClass}`}>{info.label}</span>{" "}
            exercise track.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: hasOnboarded, isLoading: onboardingLoading } =
    useHasCompletedOnboarding();
  const saveProfile = useSaveProfile();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    age: "",
    weightKg: "",
    heightCm: "",
    healthIssues: "",
    flexibilityLevel: "",
    dietaryRestrictions: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (!onboardingLoading && hasOnboarded) navigate({ to: "/plan" });
  }, [hasOnboarded, onboardingLoading, navigate]);

  if (authLoading || (isAuthenticated && onboardingLoading === true))
    return <PageLoader label="Loading…" />;

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validateStep(step, { ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validateStep(step, form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  function handleNext() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const fieldKeys = Object.keys(stepErrors) as Array<keyof FormState>;
      setTouched((prev) => {
        const next = { ...prev };
        for (const f of fieldKeys) next[f] = true;
        return next;
      });
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    const input: ProfileInput = {
      email: form.email.trim(),
      phone: form.phone.trim(),
      age: BigInt(Math.round(Number(form.age))),
      weightKg: Number(form.weightKg),
      heightCm: Number(form.heightCm),
      healthIssues: form.healthIssues.trim(),
      flexibilityLevel: BigInt(Number(form.flexibilityLevel)),
      dietaryRestrictions: form.dietaryRestrictions.trim(),
    };
    try {
      await saveProfile.mutateAsync(input);
      toast.success("Profile saved! Let's get started.", { duration: 3000 });
      navigate({ to: "/plan" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  const derivedTrack = getDerivedTrack(form.flexibilityLevel);

  return (
    <Layout hideNav>
      {/* Header with progress */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-primary-foreground"
                viewBox="0 0 20 20"
                fill="none"
              >
                <title>Heartbeat</title>
                <path
                  d="M5 10h2.5l1.5-3 2 6 1.5-3H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              FitPlan <span className="text-primary">30</span>
            </span>
          </div>
          <span className="text-sm text-muted-foreground font-body">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`text-xs font-medium transition-colors duration-300 ${i <= step ? "text-primary" : "text-muted-foreground"}`}
              >
                {s.title}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <div
        data-ocid="onboarding.page"
        className="flex-1 flex items-start sm:items-center justify-center px-4 py-8 bg-background"
      >
        <div className="w-full max-w-lg">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Card className="border-border shadow-xl shadow-foreground/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-card pb-2 pt-6 px-6 sm:px-8">
                <CardTitle className="font-display text-2xl text-foreground">
                  {STEPS[step].title}
                </CardTitle>
                <CardDescription className="text-muted-foreground font-body">
                  {STEPS[step].description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-5 pt-4">
                {/* ── Step 0: Personal Info ── */}
                {step === 0 && (
                  <>
                    <Field
                      label="Email address"
                      error={touched.email ? errors.email : undefined}
                      required
                    >
                      <Input
                        data-ocid="onboarding.email.input"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={
                          errors.email && touched.email
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.email && touched.email && (
                        <p
                          data-ocid="onboarding.email.field_error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.email}
                        </p>
                      )}
                    </Field>

                    <Field
                      label="Phone number"
                      error={touched.phone ? errors.phone : undefined}
                      required
                    >
                      <Input
                        data-ocid="onboarding.phone.input"
                        type="tel"
                        placeholder="+1 555 000 0000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className={
                          errors.phone && touched.phone
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.phone && touched.phone && (
                        <p
                          data-ocid="onboarding.phone.field_error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </Field>
                  </>
                )}

                {/* ── Step 1: Body Metrics ── */}
                {step === 1 && (
                  <>
                    <Field label="Age" hint="years" required>
                      <Input
                        data-ocid="onboarding.age.input"
                        type="number"
                        placeholder="25"
                        min={13}
                        max={120}
                        value={form.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        onBlur={() => handleBlur("age")}
                        className={
                          errors.age && touched.age
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.age && touched.age && (
                        <p
                          data-ocid="onboarding.age.field_error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.age}
                        </p>
                      )}
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Weight" hint="kg" required>
                        <Input
                          data-ocid="onboarding.weight.input"
                          type="number"
                          placeholder="70"
                          min={20}
                          max={500}
                          step={0.1}
                          value={form.weightKg}
                          onChange={(e) =>
                            handleChange("weightKg", e.target.value)
                          }
                          onBlur={() => handleBlur("weightKg")}
                          className={
                            errors.weightKg && touched.weightKg
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }
                        />
                        {errors.weightKg && touched.weightKg && (
                          <p
                            data-ocid="onboarding.weight.field_error"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.weightKg}
                          </p>
                        )}
                      </Field>

                      <Field label="Height" hint="cm" required>
                        <Input
                          data-ocid="onboarding.height.input"
                          type="number"
                          placeholder="170"
                          min={50}
                          max={280}
                          value={form.heightCm}
                          onChange={(e) =>
                            handleChange("heightCm", e.target.value)
                          }
                          onBlur={() => handleBlur("heightCm")}
                          className={
                            errors.heightCm && touched.heightCm
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }
                        />
                        {errors.heightCm && touched.heightCm && (
                          <p
                            data-ocid="onboarding.height.field_error"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.heightCm}
                          </p>
                        )}
                      </Field>
                    </div>

                    <Field label="Exercise flexibility level" required>
                      <Select
                        value={form.flexibilityLevel}
                        onValueChange={(v) => {
                          handleChange("flexibilityLevel", v);
                          handleBlur("flexibilityLevel");
                        }}
                      >
                        <SelectTrigger
                          data-ocid="onboarding.flexibility.select"
                          className={
                            errors.flexibilityLevel && touched.flexibilityLevel
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select your level…" />
                        </SelectTrigger>
                        <SelectContent>
                          {FLEXIBILITY_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.flexibilityLevel && touched.flexibilityLevel && (
                        <p
                          data-ocid="onboarding.flexibility.field_error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.flexibilityLevel}
                        </p>
                      )}
                    </Field>

                    {/* Derived fitness track display */}
                    {form.flexibilityLevel && derivedTrack && (
                      <FitnessTrackBadge
                        flexibilityLevel={form.flexibilityLevel}
                      />
                    )}

                    {/* Placeholder hint when no level selected */}
                    {!form.flexibilityLevel && (
                      <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3.5 text-sm text-muted-foreground font-body">
                        Select your flexibility level above to see which
                        exercise track you'll follow.
                      </div>
                    )}
                  </>
                )}

                {/* ── Step 2: Health & Diet ── */}
                {step === 2 && (
                  <>
                    <Field label="Health issues or conditions" hint="Optional">
                      <Textarea
                        data-ocid="onboarding.health.textarea"
                        placeholder="e.g. bad knees, lower back pain, asthma… or leave blank if none"
                        value={form.healthIssues}
                        onChange={(e) =>
                          handleChange("healthIssues", e.target.value)
                        }
                        rows={3}
                        className="resize-none"
                      />
                    </Field>

                    <Field label="Dietary restrictions" hint="Optional">
                      <Textarea
                        data-ocid="onboarding.dietary.textarea"
                        placeholder="e.g. vegetarian, gluten-free, nut allergy… or leave blank if none"
                        value={form.dietaryRestrictions}
                        onChange={(e) =>
                          handleChange("dietaryRestrictions", e.target.value)
                        }
                        rows={3}
                        className="resize-none"
                      />
                    </Field>

                    {/* Summary */}
                    <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 space-y-2">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                        Your profile summary
                      </p>
                      {[
                        { label: "Email", value: form.email },
                        { label: "Phone", value: form.phone },
                        { label: "Age", value: `${form.age} years` },
                        { label: "Weight", value: `${form.weightKg} kg` },
                        { label: "Height", value: `${form.heightCm} cm` },
                        {
                          label: "Fitness level",
                          value:
                            FLEXIBILITY_OPTIONS.find(
                              (o) => o.value === form.flexibilityLevel,
                            )?.label ?? "—",
                        },
                        {
                          label: "Exercise track",
                          value:
                            getDerivedTrack(form.flexibilityLevel)?.label ??
                            "—",
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground shrink-0">
                            {label}
                          </span>
                          <span className="font-medium text-foreground truncate ml-4 text-right min-w-0">
                            {value || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ── Navigation ── */}
                <div className="flex gap-3 pt-2">
                  {step > 0 && (
                    <Button
                      data-ocid="onboarding.back_button"
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                      onClick={() => setStep((s) => s - 1)}
                      disabled={saveProfile.isPending}
                    >
                      Back
                    </Button>
                  )}

                  {step < STEPS.length - 1 ? (
                    <Button
                      data-ocid="onboarding.next_button"
                      variant="default"
                      className="flex-1 h-12 rounded-xl font-display font-semibold"
                      onClick={handleNext}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      data-ocid="onboarding.submit_button"
                      variant="default"
                      className="flex-1 h-12 rounded-xl font-display font-semibold shadow-lg shadow-primary/20"
                      onClick={handleSubmit}
                      loading={saveProfile.isPending}
                    >
                      {saveProfile.isPending
                        ? "Saving profile…"
                        : "Start my 30-day plan →"}
                    </Button>
                  )}
                </div>

                {saveProfile.isError && (
                  <p
                    data-ocid="onboarding.error_state"
                    className="text-sm text-destructive text-center"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

// ── Helper ───────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </Label>
        {hint && (
          <span className="text-xs text-muted-foreground font-body">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
