import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { JustifyContent } from "../../../components/flex/flex.constants";
import Box from "../../../components/box";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Property() {
  const { t } = useTranslation("translation");

  const [value, setValue] = React.useState("regular");
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box css={{marginTop: "2rem"}}>
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
          <Title size={TitleSize.H4}>
            {t("pricing.services.chemics.title")}
          </Title>
        </Flex>
      </Flex>
      {checked && (
        <Flex justifyContent={JustifyContent.CENTER}>
          <Box width="300px">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeRadio}
            >
              <FormControlLabel
                value="regular"
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
                label={<Title size={TitleSize.H5} color={ThemeColors.Dark}>{t("pricing.services.chemics.regular")}</Title>}
              />
              <FormControlLabel
                value="bio"
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
                label={<Title size={TitleSize.H5} color={ThemeColors.Dark}>{t("pricing.services.chemics.bio")}</Title>}
              />
            </RadioGroup>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
