import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { mapTypeToColor } from "../../helpers/enums";
import { mapVacationToEvent } from "./utils";

export const Calendar = ({
  vacations,
  newVacationDetailsVisible,
  setNewVacationDetailsVisible,
  newVacationVisible,
  setNewVacationVisible,
  setClickInfo,
}) => {
<<<<<<< HEAD
  const [events, setEvents] = useState(vacations);
=======
  const [events, setEvents] = useState([] as any);
>>>>>>> 7793044f8d6b88b2bc499a9e456896710ff40642

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
<<<<<<< HEAD
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
=======
      displayEventTime={false}
>>>>>>> 7793044f8d6b88b2bc499a9e456896710ff40642
    />
  );
};
