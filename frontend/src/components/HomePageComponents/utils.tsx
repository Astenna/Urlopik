import { mapTypeToColor } from "../../helpers/enums";
import moment from "moment";
export const vacationTypes = {
  1: "Vacation",
  2: "Sick leave",
  3: "On request",
};

export const mapVacationToEvent = (vacation) => {
  return {
    id: vacation.id,
    start: vacation.dateFrom,
    end: moment(vacation.dateTo).add(1, "days").format("YYYY-MM-DDThh:mm:ss"),
    description: vacation.description,
    typeId: vacation.typeId,
    color: mapTypeToColor(vacation.typeId),
    title: vacation.vacationerName,
    allDay: true,
  };
};
