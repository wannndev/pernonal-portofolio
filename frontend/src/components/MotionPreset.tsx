"use client";

import React, { useRef } from "react";
import { motion, useInView, HTMLMotionProps, Transition } from "framer-motion";

export interface MotionPresetProps {
  children?: React.ReactNode;
  className?: string;
  component?: keyof typeof motion;
  transition?: Transition;
  delay?: number;
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
  blur?: boolean | string;
  slide?:
    | boolean
    | {
        direction?: "up" | "down" | "left" | "right";
        offset?: number;
      };
  fade?:
    | boolean
    | {
        initialOpacity?: number;
        opacity?: number;
      };
  zoom?:
    | boolean
    | {
        initialScale?: number;
        scale?: number;
      };
  motionProps?: HTMLMotionProps<any>;
  style?: React.CSSProperties;
}

export function MotionPreset({
  children,
  className,
  component = "div",
  transition = { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  delay = 0,
  inView = true,
  inViewMargin = "-40px",
  inViewOnce = true,
  blur = true,
  slide = false,
  fade = true,
  zoom = false,
  motionProps = {},
  style,
}: MotionPresetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: inViewOnce,
    margin: (inViewMargin as any) || "-40px",
  });

  const hidden: Record<string, any> = {};
  const visible: Record<string, any> = {};

  if (blur) {
    hidden.filter = blur === true ? "blur(10px)" : `blur(${blur})`;
    visible.filter = "blur(0px)";
  }

  if (slide) {
    const offset = slide === true ? 50 : slide.offset ?? 50;
    const direction = slide === true ? "up" : slide.direction ?? "up";
    const axis = direction === "up" || direction === "down" ? "y" : "x";
    hidden[axis] = direction === "left" || direction === "up" ? offset : -offset;
    visible[axis] = 0;
  }

  if (fade) {
    hidden.opacity =
      fade === true ? 0 : typeof fade === "object" ? fade.initialOpacity ?? 0 : 0;
    visible.opacity =
      fade === true ? 1 : typeof fade === "object" ? fade.opacity ?? 1 : 1;
  }

  if (zoom) {
    hidden.scale =
      zoom === true ? 0.9 : typeof zoom === "object" ? zoom.initialScale ?? 0.9 : 0.9;
    visible.scale =
      zoom === true ? 1 : typeof zoom === "object" ? zoom.scale ?? 1 : 1;
  }

  const MotionComponent = (motion as any)[component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={!inView || isInView ? "visible" : "hidden"}
      variants={{
        hidden,
        visible,
      }}
      transition={{
        ...transition,
        delay: ((transition as any)?.delay ?? 0) + delay,
      }}
      className={className}
      style={style}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
}

export default MotionPreset;
