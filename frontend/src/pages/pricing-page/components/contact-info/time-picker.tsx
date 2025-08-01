import React from "react";
import styled from "styled-components";
import ThemeColors from "../../../../utils/theme/colors";
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../../helpers/types";
import { ChangeFormDataType } from "../../pricing-page";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import Flex from "../../../../components/flex";
import { FlexDirection } from "../../../../components/flex/flex.constants";

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

type TimeGridProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
  formErrors: PricingPageFormDataErrors;
};

function TimeGrid({
  formData,
  handleChangeFormData,
  formErrors,
}: TimeGridProps) {  
  const times = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);

  return (
    <Flex flexDirection={FlexDirection.COLUMN}>
      <GridContainer>
        {times.map((time) => (
          <TimeBox
            key={time}
            selected={formData.time === time}
            onClick={() => handleChangeFormData("time", time)}
          >
            {time}
          </TimeBox>
        ))}
      </GridContainer>
      {formErrors.time && (
        <Title size={TitleSize.H6} color={ThemeColors.Warning}>
          {formErrors.time}
        </Title>
      )}
    </Flex>
  );
}

export default TimeGrid;
