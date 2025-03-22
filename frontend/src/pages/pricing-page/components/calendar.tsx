import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styled from "styled-components";
import ThemeColors from "../../../utils/theme/colors";
import { ChangeFormDataType } from "../pricing-page";
import { PricingPageFormData } from "../helpers/types";

const CustomCalendar = styled.div`
  .MuiDayCalendar-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  .MuiDayCalendar-weekDayLabel {
    font-weight: bold;
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .MuiPickersDay-root {
    border: 1px solid ${ThemeColors.Secondary};
    border-radius: 0;
    color: ${ThemeColors.Secondary};
    width: 70px;
  }
  .MuiPickersDay-root.Mui-selected {
    background-color: ${ThemeColors.Primary} !important;
    color: white !important;
  }
  .MuiPickersDay-today {
    border: 2px solid ${ThemeColors.Primary} !important;
  }
  .MuiPickersDay-root.MuiPickersDay-dayOutsideMonth {
    opacity: 0.5;
    color: grey !important;
  }
  .Mui-selected {
    background-color: ${ThemeColors.Primary} !important;
    color: white !important;
  }
`;

type DateCalendarProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
};

export default function DateCalendarValue({
  formData,
  handleChangeFormData,
}: DateCalendarProps) {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  return (
    <CustomCalendar>
      <DateCalendar
        value={formData.date}
        showDaysOutsideCurrentMonth
        disablePast
        onChange={(newValue) => handleChangeFormData("date", newValue)}
      />
    </CustomCalendar>
  );
}
