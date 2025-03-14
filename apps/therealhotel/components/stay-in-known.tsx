"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export default function StayInTheKnow({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const splittedText = text.split("");

  const pullupVariant = {
    initial: { y: 90, opacity: 0.05, scaleY: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scaleY: 1,
      transition: {
        delay: (i + delay) * 0.1,
        duration: 0.7,
        ease: [0.39, 0.24, 0.3, 1],
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="flex justify-center">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={`relative text-center text-[120px] font-bold leading-tight tracking-tighter  ${className}`}
        >
          {current == " " ? <span>&nbsp;</span> : current}
          <div className=" absolute bottom-0 right-0 z-10 h-[100%] w-full bg-gradient-to-t from-black opacity-80 bg-blend-lighten"></div>
        </motion.div>
      ))}
    </div>
  );
}
