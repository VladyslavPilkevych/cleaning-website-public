import {useState, ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { FlexDirection, FlexWrap, JustifyContent } from "../../../components/flex/flex.constants";
import Box from "../../../components/box";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormInput from "../../../components/form-input";

export default function Windows() {
  const { t } = useTranslation("translation");

  const [value, setValue] = useState("regular");
  const [checked, setChecked] = useState(false);
  const [formValueWindowsArea, setFormValueWindowsArea] = useState("");
  const [formValueWindows, setFormValueWindows] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleChangeWindowsArea = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValueWindowsArea(event.target.value);
  };

  const handleChangeWindows = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValueWindows(event.target.value);
  };

  return (
    <Box css={{ marginTop: "2rem" }}>
      <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
        <Flex>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              color: ThemeColors.Primary,
              "&.Mui-checked": {
                color: ThemeColors.Primary,
              },
              "& .MuiSvgIcon-root": { fontSize: 32 },
            }}
          />
          <Title size={TitleSize.H4}>{t("pricing.windows.title")}</Title>
        </Flex>
      </Flex>
      {checked && (
        <Flex justifyContent={JustifyContent.CENTER} css={{ marginTop: "4rem" }} gap="2rem" flexWrap={FlexWrap.WRAP}>
          <Box width="300px">
            <Title size={TitleSize.H4}>{t("pricing.windows.mold")}</Title>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeRadio}
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
                    {t("pricing.windows.yes")}
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
                    {t("pricing.windows.no")}
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
            handleChange={handleChangeWindowsArea}
            formValue={formValueWindowsArea}
            placeholder={t("pricing.windows.total-windows-area")}
            name="total-windows-area"
            label={t("pricing.windows.total-windows-area")}
            labelColor={ThemeColors.Primary}
            css={{ width: "300px" }}
            type="number"
          />
          <FormInput
            handleChange={handleChangeWindows}
            formValue={formValueWindows}
            placeholder={t("pricing.windows.windows-count")}
            name="windows-count"
            label={t("pricing.windows.windows-count")}
            labelColor={ThemeColors.Primary}
            css={{ width: "300px" }}
            type="number"
          />
        </Flex>
        </Flex>
      )}
    </Box>
  );
}
