import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  /** tilt degrees — lower = subtler */
  intensity?: number;
  /** show moving glare highlight */
  glare?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  whileHover?: any;
  transition?: any;
}

/**
 * Wraps children in a motion.div that tracks the mouse position and applies
 * a physics-spring 3-D tilt (rotateX / rotateY) plus an optional glare sheen.
 *
 * Uses Motion (framer-motion) primitives:
 *   useMotionValue  – raw pointer coords (0..1)
 *   useTransform    – maps [0,1] → tilt angle range
 *   useSpring       – soft spring easing on the tilt values
 */
export function Card3D({
  children,
  className,
  intensity = 10,
  glare = true,
  style,
  onClick,
  whileHover,
  transition,
}: Card3DProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Glare position (0-100 %) */
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  /* Spring-smoothed tilt angles */
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]),
    { stiffness: 360, damping: 28 }
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]),
    { stiffness: 360, damping: 28 }
  );

  /* Glare gradient follows the cursor */
  const glareBackground = useTransform(
    [glareX, glareY] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.22) 0%, transparent 55%)`
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    glareOpacity.set(1);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={whileHover}
      transition={transition}
    >
      {/* Glare sheen overlay */}
      {glare && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
          style={{ opacity: glareOpacity, background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
