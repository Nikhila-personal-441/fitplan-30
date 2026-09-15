import { Button } from "@/components/AppButton";
import { useAuth } from "@/hooks/useAuth";
import { useDerivedProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Dumbbell, LogOut, Menu, User, X, Zap } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

function ProgressPill() {
  const { completedDays, isDeveloper } = useDerivedProgress();
  const count = completedDays.length;
  if (count === 0 && !isDeveloper) return null;

  return (
    <div
      className={cn(
        "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-display border transition-fast",
        isDeveloper
          ? "border-primary/40 bg-primary/8 text-primary"
          : "border-border bg-muted text-foreground",
      )}
      title={isDeveloper ? "Developer mode active" : `${count} days completed`}
    >
      {isDeveloper ? (
        <>
          <Zap className="w-3 h-3" />
          <span>DEV</span>
        </>
      ) : (
        <>
          <Activity className="w-3 h-3 text-primary" />
          <span className="tabular-nums">
            {count}
            <span className="text-muted-foreground font-normal">/30</span>
          </span>
        </>
      )}
    </div>
  );
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = isAuthenticated ? [{ label: "My Plan", href: "/plan" }] : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && (
        <header
          className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border"
          style={{ boxShadow: "var(--shadow-header)" }}
          data-ocid="layout.header"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo — gradient brand mark */}
              <Link
                to="/"
                className="flex items-center gap-3 transition-smooth hover:opacity-90 group"
                data-ocid="layout.logo_link"
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl header-brand-gradient shadow-md group-hover:shadow-lg transition-smooth"
                  style={{
                    boxShadow: "0 2px 12px oklch(var(--primary) / 0.35)",
                  }}
                >
                  <Dumbbell className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col leading-none select-none">
                  <span className="font-display font-bold text-lg tracking-tight leading-none header-brand-text">
                    FitPlan
                  </span>
                  <span className="font-display text-[10px] font-semibold text-muted-foreground leading-none mt-0.5 tracking-widest uppercase">
                    30 Days
                  </span>
                </div>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-display font-semibold transition-fast",
                      currentPath.startsWith(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    data-ocid={`layout.nav_${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                  >
                    {currentPath.startsWith(link.href) && (
                      <span
                        className="absolute inset-0 rounded-lg bg-primary/8"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1px oklch(var(--primary) / 0.2)",
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Right actions */}
              <div className="hidden md:flex items-center gap-2">
                {isAuthenticated && <ProgressPill />}

                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-muted-foreground hover:text-foreground gap-1.5"
                    data-ocid="layout.logout_button"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </Button>
                ) : (
                  <Link to="/">
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1.5 font-display font-semibold"
                      data-ocid="layout.login_button"
                    >
                      <User className="w-4 h-4" />
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-foreground hover:bg-muted transition-fast"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                data-ocid="layout.mobile_menu_toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden border-t border-border bg-card/98 backdrop-blur-sm px-4 py-3 flex flex-col gap-2 fade-in"
              data-ocid="layout.mobile_menu"
            >
              {isAuthenticated && (
                <div className="flex items-center justify-center py-1">
                  <ProgressPill />
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-fast",
                    currentPath.startsWith(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-ocid={`layout.mobile_nav_${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start text-muted-foreground hover:text-foreground"
                  data-ocid="layout.mobile_logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Button>
              ) : (
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-1.5 font-display font-semibold"
                    data-ocid="layout.mobile_login_button"
                  >
                    <User className="w-4 h-4" />
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          )}
        </header>
      )}

      <main className="flex-1 flex flex-col" data-ocid="layout.main">
        {children}
      </main>

      <footer
        className="bg-muted/40 border-t border-border py-6 px-4"
        data-ocid="layout.footer"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg header-brand-gradient opacity-80">
              <Dumbbell className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">
              FitPlan 30
            </span>
          </div>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-fast"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
