import React, { useEffect, useState } from "react";
import Box from "../../../components/box";
import ImageComponent from "../../../components/image";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ThemeColors from "../../../utils/theme/colors";
import styled from "styled-components";
import { superbaseGetAllOrdersAPI } from "../../../utils/api/api";
import { convertToEvent } from "./helpers/utils";
import { DbPricingFormData } from "../../pricing-page/helpers/types";
import { TableEvent } from "./helpers/types";
import AdminTableCurrentInfo from "./admin-table-current-info";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { EventContentArg } from "@fullcalendar/core";

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

const StyledEventContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  padding: 4px;
  white-space: normal;

  .event-time {
    font-weight: bold;
    font-size: 13px;
  }

  .event-name,
  .event-address {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.4;
  }

  .event-address {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    max-height: calc(1.4em * 4);
  }

  .event-label {
    font-weight: bold;
  }
`;

const renderEventContent = (eventInfo: EventContentArg, t: TFunction<"translation">) => {
  const { timeText, event } = eventInfo;

  const name = event.extendedProps?.name || "—";
  const address = event.extendedProps?.address || "—";

  return (
    <StyledEventContent>
      <div className="event-time">{timeText}</div>
      <div className="event-name">
        <span className="event-label">{t("admin-panel.event.name")}:</span> {name}
      </div>
      <div className="event-address">
        <span className="event-label">{t("admin-panel.event.address")}:</span> {address}
      </div>
    </StyledEventContent>
  );
};

export default function AdminTable() {
  const [events, setEvents] = useState<TableEvent[] | null>(null);
  const [orders, setOrders] = useState<DbPricingFormData[] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DbPricingFormData | null>(
    null
  );
  const { t } = useTranslation("translation");

  async function getOrders() {
    await superbaseGetAllOrdersAPI()
      .then((rsp) => {
        if (rsp.status === 200) {
          setOrders(rsp.data);
          console.log("orders:", rsp.data);
          setEvents(
            rsp.data.map((data: DbPricingFormData) => convertToEvent(data))
          );
          console.log(
            "events:",
            rsp.data.map((data: DbPricingFormData) => convertToEvent(data))
          );
        }
      })
      .catch((err) => {
        console.error("Error submitting contact form:", err);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  const handleEventClick = (clickInfo: any) => {
    const currentTableEvent = orders?.find(
      (event) => event.id === clickInfo.event.extendedProps.customId
    );
    setSelectedEvent(currentTableEvent || null);
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
      {events && (
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
            eventContent={(eventInfo) => renderEventContent(eventInfo, t)}
            slotMinTime="06:00:00"
            slotMaxTime="20:00:00"
          />
        </StyledCalendarWrapper>
      )}
      {selectedEvent && <AdminTableCurrentInfo selectedEvent={selectedEvent} />}
    </Box>
  );
}
