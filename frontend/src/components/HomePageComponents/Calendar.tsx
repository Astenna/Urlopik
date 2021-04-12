import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
}) => {
  const [events, setEvents] = useState(vacations);

  const vacationClicked = (clickInfo) => {
    setNewVacationDetailsVisible(!newVacationDetailsVisible);
  };

  useEffect(() => setEvents(vacations), [vacations]);
  return (
    <FullCalendar
      editable={true}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      timeZone="UTC+2"
      events={events}
      eventClick={(clickInfo) => vacationClicked(clickInfo)}
    />
  );
};
