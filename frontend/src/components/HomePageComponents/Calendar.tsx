import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { mapVacationToEvent } from "./utils";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
  newVacationVisible,
  setNewVacationVisible,
  setClickInfo,
}) => {
  const [events, setEvents] = useState([] as any);

  const vacationClicked = (clickInfo) => {
    setNewVacationDetailsVisible(!newVacationDetailsVisible);
    setClickInfo(clickInfo);
  };

  useEffect(() => {
    const mappedEvents = vacations.map((vacation) =>
      mapVacationToEvent(vacation)
    );
    setEvents(mappedEvents);
  }, [vacations]);

  return (
    <FullCalendar
      editable={true}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(clickInfo) => vacationClicked(clickInfo)}
      displayEventTime={false}
      headerToolbar={{
        left: "title",
        right: "planVacation prev,next today",
      }}
      customButtons={{
        planVacation: {
          text: "Plan Vacation",
          click: () => {
            setNewVacationVisible(!newVacationVisible);
          },
        },
      }}
    />
  );
};
