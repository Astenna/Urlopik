import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
  setClickInfo,
}) => {
  const [events, setEvents] = useState(vacations);
  console.log(events);

  const vacationClicked = (clickInfo) => {
    console.log(clickInfo.event);
    setNewVacationDetailsVisible(!newVacationDetailsVisible);
    setClickInfo(clickInfo);
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
