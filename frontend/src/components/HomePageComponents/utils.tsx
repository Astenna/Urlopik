import { mapTypeToColor } from "../../helpers/enums";

export const vacationTypes = {
  1: "Vacation",
  2: "Sick leave",
  3: "On request",
};

export const mapVacationToEvent = (vacation) => {
  return {
    id: vacation.id,
    start: vacation.start,
    end: vacation.end,
    description: vacation.description,
    typeId: vacation.typeId,
    color: mapTypeToColor(vacation.typeId),
    title: "Tomasz Zawadzki",
    allDay: true,
  };
};
