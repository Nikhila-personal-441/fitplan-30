import type { AuthStatus } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface UseAuthReturn {
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  identity: ReturnType<typeof useInternetIdentity>["identity"];
  login: () => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const { identity, loginStatus, login, clear, isAuthenticated } =
    useInternetIdentity();

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";

  let status: AuthStatus;
  if (isLoading) {
    status = "initializing";
  } else if (isAuthenticated) {
    status = "authenticated";
  } else {
    status = "anonymous";
  }

  return {
    status,
    isAuthenticated,
    isLoading,
    identity,
    login,
    logout: clear,
  };
}
