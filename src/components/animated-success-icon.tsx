"use client"

import { motion } from "framer-motion"

export function AnimatedSuccessIcon() {
  // Animation variants for the circle
  const circleVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  // Animation variants for the checkmark
  const checkVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          variants={circleVariants}
        />
        <motion.path
          d="M8 12l3 3 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={checkVariants}
        />
      </motion.svg>
    </div>
  )
}

