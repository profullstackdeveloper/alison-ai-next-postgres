export const getPerformanceLevel = (value: number): {
  label: string;
  color: "success" | "primary" | "warning" | "error";
} => {
  if (value >= 90) {
    return { label: "Excellent", color: "success" };
  } else if (value >= 75) {
    return { label: "Good", color: "primary" };
  } else if (value >= 60) {
    return { label: "Average", color: "warning" };
  } else {
    return { label: "Needs Improvement", color: "error" };
  }
};

export const classOptions = ["Math", "Science", "History"];