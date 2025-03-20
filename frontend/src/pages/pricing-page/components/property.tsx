import { useState, ChangeEvent } from "react";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import {
  FlexDirection,
  FlexWrap,
  JustifyContent,
} from "../../../components/flex/flex.constants";
import Box from "../../../components/box";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormInput from "../../../components/form-input";

export default function Property() {
  const { t } = useTranslation("translation");

  const [value, setValue] = useState("regular");
  const [valueSteps, setValueSteps] = useState("no");
  const [formValueArea, setFormValueArea] = useState("");
  const [formValueRooms, setFormValueRooms] = useState("");

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleChangeSteps = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSteps(event.target.value);
  };

  const handleChangeArea = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValueArea(event.target.value);
  };

  const handleChangeRooms = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValueRooms(event.target.value);
  };

  return (
    <Box css={{ marginTop: "2rem" }}>
      <Flex justifyContent={JustifyContent.SPACE_EVENLY} gap="2rem" flexWrap={FlexWrap.WRAP}>
        <Box width="300px">
          <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
            <Title size={TitleSize.H4}>{t("pricing.property.type")}</Title>
          </Flex>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChangeRadio}
          >
            <FormControlLabel
              value="house"
              control={
                <Radio
                  sx={{
                    color: ThemeColors.Primary,
                    "&.Mui-checked": {
                      color: ThemeColors.Primary,
                    },
                  }}
                />
              }
              label={
                <Title size={TitleSize.H5} color={ThemeColors.Dark}>
                  {t("pricing.property.house")}
                </Title>
              }
            />
            <FormControlLabel
              value="apartment"
              control={
                <Radio
                  sx={{
                    color: ThemeColors.Primary,
                    "&.Mui-checked": {
                      color: ThemeColors.Primary,
                    },
                  }}
                />
              }
              label={
                <Title size={TitleSize.H5} color={ThemeColors.Dark}>
                  {t("pricing.property.apartment")}
                </Title>
              }
            />
            <FormControlLabel
              value="office"
              control={
                <Radio
                  sx={{
                    color: ThemeColors.Primary,
                    "&.Mui-checked": {
                      color: ThemeColors.Primary,
                    },
                  }}
                />
              }
              label={
                <Title size={TitleSize.H5} color={ThemeColors.Dark}>
                  {t("pricing.property.office")}
                </Title>
              }
            />
          </RadioGroup>
        </Box>
        <Flex
          justifyContent={JustifyContent.CENTER}
          flexDirection={FlexDirection.COLUMN}
          gap="1rem"
        >
          <FormInput
            handleChange={handleChangeArea}
            formValue={formValueArea}
            placeholder={t("pricing.property.area")}
            name="area"
            label={t("pricing.property.area")}
            labelColor={ThemeColors.Primary}
            css={{ width: "300px" }}
            type="number"
          />
          <FormInput
            handleChange={handleChangeRooms}
            formValue={formValueRooms}
            placeholder={t("pricing.property.rooms")}
            name="rooms"
            label={t("pricing.property.rooms")}
            labelColor={ThemeColors.Primary}
            css={{ width: "300px" }}
            type="number"
          />
        </Flex>
        <Box width="300px">
          {" "}
          <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
            <Title size={TitleSize.H4}>{t("pricing.property.steps")}</Title>
          </Flex>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={valueSteps}
            onChange={handleChangeSteps}
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  sx={{
                    color: ThemeColors.Primary,
                    "&.Mui-checked": {
                      color: ThemeColors.Primary,
                    },
                  }}
                />
              }
              label={
                <Title size={TitleSize.H5} color={ThemeColors.Dark}>
                  {t("pricing.property.yes")}
                </Title>
              }
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  sx={{
                    color: ThemeColors.Primary,
                    "&.Mui-checked": {
                      color: ThemeColors.Primary,
                    },
                  }}
                />
              }
              label={
                <Title size={TitleSize.H5} color={ThemeColors.Dark}>
                  {t("pricing.property.no")}
                </Title>
              }
            />
          </RadioGroup>
        </Box>
      </Flex>
    </Box>
  );
}
