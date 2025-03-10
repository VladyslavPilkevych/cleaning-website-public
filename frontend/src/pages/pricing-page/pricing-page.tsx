import React from "react";
import DateCalendarValue from "./components/calendar";
import TimePicker from "./components/time-picker";
import Flex from "../../components/flex";
import { JustifyContent } from "../../components/flex/flex.constants";
import Box from "../../components/box";
import CardContainer from "./components/card-container";

export default function PricingPage() {
  return (
    <Box>
      <Flex justifyContent={JustifyContent.SPACE_EVENLY}>
        <DateCalendarValue />
        <TimePicker />
      </Flex>

      <CardContainer />
    </Box>
  );
}
