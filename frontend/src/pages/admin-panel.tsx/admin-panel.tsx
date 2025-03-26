import React, { useState } from "react";
import Box from "../../components/box";
import ImageComponent from "../../components/image";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Title from "../../components/title";
import { TitleSize } from "../../components/title/title.constants";
import ThemeColors from "../../utils/theme/colors";
import Flex from "../../components/flex";
import { FontWeight } from "../../utils/theme/fonts";
import styled from "styled-components";

const StyledCalendarWrapper = styled.div`
  max-height: 800px;
  overflow: hidden;
  padding: 1rem;

  .fc {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    background-color: ${ThemeColors.LightGray};
    color: ${ThemeColors.DarkGray};
  }

  .fc-toolbar {
    background-color: ${ThemeColors.Primary};
    color: white;
    padding: 10px;
    border-radius: 5px;
  }

  .fc-toolbar-title {
    font-size: 18px;
    font-weight: bold;
  }

  .fc-daygrid-day {
    background-color: ${ThemeColors.White};
    border: 1px solid ${ThemeColors.LightGray};
  }

  .fc-daygrid-day:hover {
    background-color: ${ThemeColors.White};
  }

  .fc-event {
    background-color: ${ThemeColors.Primary};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    transition: background-color 0.5s ease;
  }

  .fc-event:hover {
    background-color: ${ThemeColors.Secondary};
  }

  .fc {
    max-width: 1400px;
    margin: 0 auto;
  }

  .fc-button {
    background-color: ${ThemeColors.Secondary};
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.5s ease;
  }

  .fc-button:hover {
    background-color: ${ThemeColors.Accent};
  }

  .fc-button-active {
    background-color: ${ThemeColors.Dark};
  }
`;


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
      />
      <StyledCalendarWrapper>
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
      </StyledCalendarWrapper>
      {selectedEvent && (
        <Box
          css={{
            margin: "3rem auto",
            gap: "1rem",
            width: "fit-content",
            border: `1px solid ${ThemeColors.Primary}`,
            borderRadius: "5px",
            padding: "3rem",
            backgroundColor: ThemeColors.Background,
          }}
        >
          <Title size={TitleSize.H4}>{selectedEvent?.title}</Title>
          <Flex gap="1rem">
            <Title size={TitleSize.H6} color={ThemeColors.Dark} fontWeight={FontWeight.Bold}>Start time:</Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>{selectedEvent?.start?.toLocaleString()}</Title>
          </Flex>
          <Flex gap="1rem">
            <Title size={TitleSize.H6} color={ThemeColors.Dark} fontWeight={FontWeight.Bold}>End time:</Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>{selectedEvent?.end?.toLocaleString()}</Title>
          </Flex>
          <Flex gap="1rem">
            <Title size={TitleSize.H6} color={ThemeColors.Dark} fontWeight={FontWeight.Bold}>Description:</Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>{selectedEvent?.description}</Title>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
