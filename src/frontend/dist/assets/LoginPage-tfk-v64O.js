import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PageLoader } from "./index-BEzjik7-.js";
import { c as createLucideIcon, u as useAuth, a as useHasCompletedOnboarding, L as Layout, m as motion, D as Dumbbell, Z as Zap, B as Button } from "./proxy-DjqoCLfy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const features = [
  { icon: Zap, label: "30 Workouts", desc: "A new workout every single day" },
  {
    icon: Target,
    label: "Personalised",
    desc: "Tailored to your fitness level"
  },
  { icon: Dumbbell, label: "Track Progress", desc: "See how far you've come" }
];
const stats = [
  { value: "30", label: "Days" },
  { value: "100+", label: "Exercises" },
  { value: "5", label: "Fitness Levels" }
];
function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const { data: hasOnboarded, isLoading: onboardingLoading } = useHasCompletedOnboarding();
  reactExports.useEffect(() => {
    if (!isAuthenticated || onboardingLoading) return;
    if (hasOnboarded) {
      navigate({ to: "/plan" });
    } else {
      navigate({ to: "/onboarding" });
    }
  }, [isAuthenticated, hasOnboarded, onboardingLoading, navigate]);
  if (isLoading || isAuthenticated && onboardingLoading === true) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Signing you in…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -right-48 w-[500px] h-[400px] rounded-full bg-primary/8 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-accent/10 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "login.page",
        className: "relative flex-1 flex flex-col items-center justify-center px-4 py-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              className: "flex flex-col items-center gap-4 mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-10 h-10 text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground tracking-tight leading-none", children: [
                    "FitPlan ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "30" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-base sm:text-lg font-body", children: "Your complete 30-day fitness journey" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25, duration: 0.5 },
              className: "flex flex-wrap justify-center gap-3 mb-10",
              children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: f.label })
                  ]
                },
                f.label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.15, duration: 0.6, ease: "easeOut" },
              className: "w-full max-w-md",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl shadow-foreground/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl text-foreground mb-2", children: "Ready to transform?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed font-body", children: "Sign in securely with Internet Identity — no passwords, no tracking. Your data lives only on-chain." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "login.primary_button",
                    variant: "hero",
                    className: "w-full text-base h-14 rounded-2xl font-display font-bold shadow-lg shadow-primary/25",
                    onClick: login,
                    loading: isLoading,
                    children: isLoading ? "Signing in…" : "Sign in with Internet Identity"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-5 font-body", children: "Secure, passwordless login. No personal data is stored by the login service." })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.55, duration: 0.5 },
              className: "flex gap-10 mt-12",
              children: stats.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl text-primary", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body mt-0.5", children: label })
              ] }, label))
            }
          )
        ]
      }
    )
  ] });
}
export {
  LoginPage as default
};
