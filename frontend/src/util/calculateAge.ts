import { formatDistance } from "date-fns";
export const calculateAge = (date: Date) => {
  if (!date) return
  return formatDistance(date, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
};
