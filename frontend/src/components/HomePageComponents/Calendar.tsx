import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
  newVacationVisible,
  setNewVacationVisible,
  setClickInfo,
}) => {
  const [events, setEvents] = useState(vacations);

  const vacationClicked = (clickInfo) => {
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
      headerToolbar={{
        left: "title",
        right: "myCustomButton today prev,next",
      }}
      customButtons={{
        myCustomButton: {
          text: "Plan Vacation",
          click: function () {
            setNewVacationVisible(!newVacationVisible);
          },
        },
      }}
    />
  );
};
