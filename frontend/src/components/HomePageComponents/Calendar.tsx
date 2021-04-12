import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { mapTypeToColor } from "../../helpers/enums";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
  setClickInfo,
}) => {
  const [events, setEvents] = useState([] as any);

  const vacationClicked = (clickInfo) => {
    console.log(clickInfo.event);
    setNewVacationDetailsVisible(!newVacationDetailsVisible);
    setClickInfo(clickInfo);
  };

  useEffect(() => {
    const mappedEvents = vacations.map((event) => ({
      id: event.id,
      start: event.start,
      end: event.end,
      description: event.description,
      color: mapTypeToColor(event.typeId),
      title: "Tomasz Zawadzki",
    }));
    setEvents(mappedEvents);
  }, [vacations]);

  return (
    <FullCalendar
      editable={true}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      timeZone="UTC+2"
      events={events}
      eventClick={(clickInfo) => vacationClicked(clickInfo)}
      displayEventTime={false}
    />
  );
};
