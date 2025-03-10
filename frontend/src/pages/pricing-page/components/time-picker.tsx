import React, { useState } from "react";
import styled from "styled-components";
import ThemeColors from "../../../utils/theme/colors";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 16px;
  max-width: 400px;
`;

const TimeBox = styled.div<{ selected: boolean }>`
  width: 70px;
  font-family: Montserrat;
  background-color: ${(props) =>
    props.selected ? ThemeColors.Primary : ThemeColors.White};
  color: ${(props) => (props.selected ? ThemeColors.White : ThemeColors.Dark)};
  padding: 10px;
  text-align: center;
  border: 2px solid ${ThemeColors.Dark};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${ThemeColors.Secondary};
    color: ${ThemeColors.White};
  }
`;

const TimeGrid: React.FC = () => {
  const times = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <GridContainer>
      {times.map((time) => (
        <TimeBox
          key={time}
          selected={selectedTime === time}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </TimeBox>
      ))}
    </GridContainer>
  );
};

export default TimeGrid;
