import React, { useState } from "react";
import Box from "../../components/box";
import ImageComponent from "../../components/image";
import { useTranslation } from "react-i18next";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type Event = {
  title: string;
  start: string;
  end: string;
  description: string;
};

const events: Event[] = [
  {
    title: "Danies",
    start: "2025-03-16T10:00:00",
    end: "2025-03-16T12:00:00",
    description: "House cleaning. Card",
  },
  {
    title: "Martina",
    start: "2025-03-17T13:00:00",
    end: "2025-03-17T14:00:00",
    description: "Apartment cleaning. Cash",
  },
  {
    title: "Tomas",
    start: "2025-03-18T09:00:00",
    end: "2025-03-18T11:00:00",
    description: "Apartment cleaning. Card",
  },
  {
    title: "Vasko",
    start: "2025-03-18T10:00:00",
    end: "2025-03-18T12:00:00",
    description: "Apartment cleaning. Cash",
  },
  {
    title: "Lily",
    start: "2025-03-19T15:00:00",
    end: "2025-03-19T16:30:00",
    description: "House cleaning. Cash",
  },
];

export default function AdminPanel() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      description: clickInfo.event.extendedProps.description,
    });
  };

  return (
    <Box>
      <ImageComponent
        src="/images/admin-panel.png"
        asBackground
        fixedBg
        height="400px"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      />{" "}
      <Box height="800px" css={{ overflow: "hidden" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          editable={true}
          selectable={true}
          eventClick={handleEventClick}
          slotMinTime="06:00:00"
          slotMaxTime="20:00:00"
        />
      </Box>
      {selectedEvent && (
        <Box
          css={{
            marginTop: "20px",
            width: "fit-content",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{selectedEvent?.title}</h3>
          <p>
            <strong>Start time:</strong>{" "}
            {selectedEvent?.start?.toLocaleString()}
          </p>
          <p>
            <strong>End time:</strong> {selectedEvent?.end?.toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent?.description}
          </p>
        </Box>
      )}
    </Box>
  );
}
