import { formatDistance } from "date-fns";
export const calculateAge = (date: Date) => {

  return formatDistance(date, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
};
