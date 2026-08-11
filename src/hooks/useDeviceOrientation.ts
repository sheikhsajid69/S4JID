import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to track mobile device orientation and motion events.
 * Smooths orientation (tilting) via Lerp and applies direct DOM transforms to target element
 * to eliminate React root re-render overhead (60fps main-thread lag).
 */
export function useDeviceOrientation(elementRef?: React.RefObject<HTMLElement | null>) {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  // Target positions populated by raw events
  const targetX = useRef(0);
  const targetY = useRef(0);

  // Current interpolated positions
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Shake velocity
  const shakeVelocityX = useRef(0);
  const shakeVelocityY = useRef(0);

  // Raw acceleration values for shake detection
  const lastX = useRef<number | null>(null);
  const lastY = useRef<number | null>(null);
  const lastZ = useRef<number | null>(null);
  const lastUpdate = useRef(0);

  // Track if orientation events are actively firing
  const hasOrientationEvents = useRef(false);

  // Request permission (needed for iOS 13+)
  const requestPermission = async () => {
    const DeviceOrientation = (window as any).DeviceOrientationEvent;
    if (DeviceOrientation && typeof DeviceOrientation.requestPermission === "function") {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
        }
      } catch (err) {
        console.error("Device orientation permission request failed:", err);
        setPermissionGranted(false);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    // Only listen on mobile/touch devices with fine orientation sensors
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (permissionGranted === false) return;

    // Listen to orientation (tilt)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null && e.beta === null) return;
      hasOrientationEvents.current = true;

      const rawGamma = e.gamma !== null ? e.gamma : 0;
      const rawBeta = e.beta !== null ? e.beta : 45;

      const clampVal = 25;
      const gammaClamped = Math.max(-clampVal, Math.min(clampVal, rawGamma));
      const betaClamped = Math.max(-clampVal, Math.min(clampVal, rawBeta - 45));

      targetX.current = -gammaClamped * 0.6;
      targetY.current = -betaClamped * 0.6;
    };

    // Listen to motion (shake detection)
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.acceleration;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const curTime = Date.now();
      const diffTime = curTime - lastUpdate.current;

      if (diffTime > 100) {
        lastUpdate.current = curTime;

        if (lastX.current !== null && lastY.current !== null && lastZ.current !== null) {
          const speed = Math.abs(x + y + z - lastX.current - lastY.current - lastZ.current) / diffTime * 10000;
          if (speed > 800) {
            shakeVelocityX.current += x * 2;
            shakeVelocityY.current += y * 2;
          }
        }

        lastX.current = x;
        lastY.current = y;
        lastZ.current = z;
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    window.addEventListener("devicemotion", handleMotion, { passive: true });

    let rafId = 0;
    const animate = () => {
      // Only run RAF loop if orientation events are actively firing and element exists
      if (hasOrientationEvents.current && elementRef?.current) {
        const lerpFactor = 0.08;
        currentX.current += (targetX.current - currentX.current) * lerpFactor;
        currentY.current += (targetY.current - currentY.current) * lerpFactor;

        currentX.current += shakeVelocityX.current;
        currentY.current += shakeVelocityY.current;
        shakeVelocityX.current *= 0.88;
        shakeVelocityY.current *= 0.88;

        const maxOffset = 24;
        const xOffset = Math.max(-maxOffset, Math.min(maxOffset, currentX.current));
        const yOffset = Math.max(-maxOffset, Math.min(maxOffset, currentY.current));

        elementRef.current.style.transform = `translate3d(${xOffset.toFixed(2)}px, ${yOffset.toFixed(2)}px, 0) scale(1.08)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
      cancelAnimationFrame(rafId);
    };
  }, [permissionGranted, elementRef]);

  return { requestPermission, permissionGranted };
}
