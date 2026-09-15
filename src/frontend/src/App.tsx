import { PageLoader } from "@/components/ui/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import React, { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const PlanPage = lazy(() => import("@/pages/PlanPage"));
const DayDetailPage = lazy(() => import("@/pages/DayDetailPage"));

// ─── Error Boundary ───────────────────────────────────────────────────────────
interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <div className="text-center max-w-sm">
            <h1 className="font-display font-bold text-xl text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground font-body mb-6">
              {this.state.message}
            </p>
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors"
              onClick={() => {
                this.setState({ hasError: false, message: "" });
                window.location.href = "/";
              }}
            >
              Reload app
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
  notFoundComponent: () => <LoginPage />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plan",
  component: PlanPage,
});

const dayDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plan/$day",
  component: DayDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  planRoute,
  dayDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  );
}
