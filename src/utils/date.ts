export const formatTime = (date: string | null) => {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};