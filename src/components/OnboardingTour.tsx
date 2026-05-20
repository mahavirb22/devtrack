"use client";

import { useEffect, useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface OnboardingTourProps {
  onComplete: () => void;
}

// steps match the actual widget ids on the dashboard
const TOUR_STEPS = [
  {
    element: "#widget-contribution-graph",
    popover: {
      title: "Contribution Graph",
      description: "See your daily GitHub commit activity. Switch between 7, 14, 30, and 90 day views.",
    },
  },
  {
    element: "#widget-streak",
    popover: {
      title: "Streak Tracker",
      description: "Your current commit streak — how many days in a row you've pushed code.",
    },
  },
  {
    element: "#widget-pr-metrics",
    popover: {
      title: "PR Analytics",
      description: "Average review time, merge rate, and open vs closed pull request counts.",
    },
  },
  {
    element: "#widget-top-repos",
    popover: {
      title: "Top Repositories",
      description: "Your most active repos ranked by commits. Click column headers to sort.",
    },
  },
  {
    element: "#widget-goals",
    popover: {
      title: "Weekly Goals",
      description: "Set coding targets and track your progress automatically.",
    },
  },
];

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const startTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      steps: TOUR_STEPS,
      onDestroyStarted: () => {
        // mark tour as seen whether user finishes or skips
        onComplete();
        driverObj.destroy();
      },
    });

    driverObj.drive();
  }, [onComplete]);


  // auto-start on mount
  useEffect(() => {
    // small delay so dashboard widgets have time to render first
    const timer = setTimeout(startTour, 800);
    return () => clearTimeout(timer);
  }, [startTour]);

  return null;
}
