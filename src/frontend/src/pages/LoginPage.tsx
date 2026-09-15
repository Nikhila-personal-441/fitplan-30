import { Button } from "@/components/AppButton";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useHasCompletedOnboarding } from "@/hooks/useUserProfile";
import { useNavigate } from "@tanstack/react-router";
import { Dumbbell, Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const features = [
  { icon: Zap, label: "30 Workouts", desc: "A new workout every single day" },
  {
    icon: Target,
    label: "Personalised",
    desc: "Tailored to your fitness level",
  },
  { icon: Dumbbell, label: "Track Progress", desc: "See how far you've come" },
];

const stats = [
  { value: "30", label: "Days" },
  { value: "100+", label: "Exercises" },
  { value: "5", label: "Fitness Levels" },
];

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const { data: hasOnboarded, isLoading: onboardingLoading } =
    useHasCompletedOnboarding();

  useEffect(() => {
    if (!isAuthenticated || onboardingLoading) return;
    if (hasOnboarded) {
      navigate({ to: "/plan" });
    } else {
      navigate({ to: "/onboarding" });
    }
  }, [isAuthenticated, hasOnboarded, onboardingLoading, navigate]);

  // Only show full-screen loader when actively signing in, or waiting for
  // onboarding check AFTER authentication has resolved (not before)
  if (isLoading || (isAuthenticated && onboardingLoading === true)) {
    return <PageLoader label="Signing you in…" />;
  }

  return (
    <Layout hideNav>
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div
        data-ocid="login.page"
        className="relative flex-1 flex flex-col items-center justify-center px-4 py-16"
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-10"
        >
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
            <Dumbbell className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground tracking-tight leading-none">
              FitPlan <span className="text-primary">30</span>
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg font-body">
              Your complete 30-day fitness journey
            </p>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-sm"
            >
              <f.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-display font-semibold text-foreground">
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl shadow-foreground/5">
            <div className="text-center mb-8">
              <h2 className="font-display font-semibold text-2xl text-foreground mb-2">
                Ready to transform?
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                Sign in securely with Internet Identity — no passwords, no
                tracking. Your data lives only on-chain.
              </p>
            </div>

            <Button
              data-ocid="login.primary_button"
              variant="hero"
              className="w-full text-base h-14 rounded-2xl font-display font-bold shadow-lg shadow-primary/25"
              onClick={login}
              loading={isLoading}
            >
              {isLoading ? "Signing in…" : "Sign in with Internet Identity"}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-5 font-body">
              Secure, passwordless login. No personal data is stored by the
              login service.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex gap-10 mt-12"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-3xl text-primary">
                {value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
