import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";

type DeviceMotionEventWithPermission = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function getTodayDateKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const STEP_MAGNITUDE_THRESHOLD = 12; // m/s²
const STEP_COOLDOWN_MS = 350; // min ms between steps
const SAVE_DEBOUNCE_MS = 30_000; // save every 30s

export interface StepTrackingResult {
  steps: number;
  permissionGranted: boolean;
  requestPermission: () => Promise<void>;
  isSupported: boolean;
}

export function useStepTracking(): StepTrackingResult {
  const { actor } = useActor(createActor);

  const [steps, setSteps] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const stepsRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listenerActiveRef = useRef(false);
  const prevAccRef = useRef<{ x: number; y: number; z: number } | null>(null);

  // Persist steps to backend, debounced
  const persistSteps = useCallback(
    (count: number) => {
      if (!actor) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        try {
          await actor.saveStepCount(getTodayDateKey(), BigInt(count));
        } catch {
          // silent — step save is best-effort
        }
      }, SAVE_DEBOUNCE_MS);
    },
    [actor],
  );

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x == null || acc.y == null || acc.z == null) return;

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      const prev = prevAccRef.current;
      if (prev) {
        const delta = Math.abs(
          magnitude -
            Math.sqrt(prev.x * prev.x + prev.y * prev.y + prev.z * prev.z),
        );
        const now = Date.now();
        if (
          delta > STEP_MAGNITUDE_THRESHOLD &&
          now - lastStepTimeRef.current > STEP_COOLDOWN_MS
        ) {
          lastStepTimeRef.current = now;
          stepsRef.current += 1;
          setSteps(stepsRef.current);
          persistSteps(stepsRef.current);
        }
      }
      prevAccRef.current = { x, y, z };
    },
    [persistSteps],
  );

  const attachListener = useCallback(() => {
    if (listenerActiveRef.current) return;
    window.addEventListener("devicemotion", handleMotion);
    listenerActiveRef.current = true;
  }, [handleMotion]);

  const requestPermission = useCallback(async () => {
    const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;
    if (typeof DME.requestPermission === "function") {
      try {
        const result = await DME.requestPermission();
        if (result === "granted") {
          setPermissionGranted(true);
          attachListener();
        }
      } catch {
        // user denied or browser error
      }
    } else {
      // No permission API needed — directly attach
      setPermissionGranted(true);
      attachListener();
    }
  }, [attachListener]);

  useEffect(() => {
    // Feature detection
    if (typeof window === "undefined" || !("DeviceMotionEvent" in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;
    // On non-iOS or older iOS, attach immediately without permission prompt
    if (typeof DME.requestPermission !== "function") {
      setPermissionGranted(true);
      attachListener();
    }
    // On iOS 13+ we wait for explicit user requestPermission() call

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      listenerActiveRef.current = false;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [attachListener, handleMotion]);

  // Final flush on unmount
  useEffect(() => {
    return () => {
      if (actor && stepsRef.current > 0) {
        actor
          .saveStepCount(getTodayDateKey(), BigInt(stepsRef.current))
          .catch(() => {});
      }
    };
  }, [actor]);

  return { steps, permissionGranted, requestPermission, isSupported };
}
