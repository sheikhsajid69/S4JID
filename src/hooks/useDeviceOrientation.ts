import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to track mobile device orientation and motion events.
 * Smooths orientation (tilting) via Lerp and models shakes via slosh physics.
 */
export function useDeviceOrientation() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
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
      // Non-iOS or older iOS versions
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (permissionGranted !== true) return;

    // Listen to orientation (tilt)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const rawGamma = e.gamma !== null ? e.gamma : 0;
      const rawBeta = e.beta !== null ? e.beta : 45; // Default viewing angle

      // Clamp tilt values to prevent background escaping scale bounds
      const clampVal = 30;
      const gammaClamped = Math.max(-clampVal, Math.min(clampVal, rawGamma));
      const betaClamped = Math.max(-clampVal, Math.min(clampVal, rawBeta - 45));

      // Target offsets (scale down to a comfortable displacement range)
      targetX.current = -gammaClamped * 0.8;
      targetY.current = -betaClamped * 0.8;
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

          // Threshold for a shake event
          if (speed > 800) {
            // Inject velocity into the position coordinates (slosh effect)
            shakeVelocityX.current += x * 2.5;
            shakeVelocityY.current += y * 2.5;
          }
        }

        lastX.current = x;
        lastY.current = y;
        lastZ.current = z;
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("devicemotion", handleMotion);

    // Animation frame loop
    let rafId = 0;
    const animate = () => {
      const lerpFactor = 0.08;
      currentX.current += (targetX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      // Add shake velocity and apply friction decay
      currentX.current += shakeVelocityX.current;
      currentY.current += shakeVelocityY.current;
      shakeVelocityX.current *= 0.88;
      shakeVelocityY.current *= 0.88;

      // Safety bounds (prevents shifting background past the scaled edges)
      const maxOffset = 32;
      const xOffset = Math.max(-maxOffset, Math.min(maxOffset, currentX.current));
      const yOffset = Math.max(-maxOffset, Math.min(maxOffset, currentY.current));

      setCoords({ x: xOffset, y: yOffset });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
      cancelAnimationFrame(rafId);
    };
  }, [permissionGranted]);

  return { coords, requestPermission, permissionGranted };
}
