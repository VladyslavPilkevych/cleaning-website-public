import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
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
import { ChangeFormDataType } from "../pricing-page";
import { PricingPageFormData } from "../helpers/types";

type WindowsProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
};

export default function Windows({
  formData,
  handleChangeFormData,
}: WindowsProps) {
  const { t } = useTranslation("translation");

  return (
    <Box css={{ marginTop: "2rem" }}>
      <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
        <Flex>
          <Checkbox
            checked={formData.windows.cleaning ?? false}
            onChange={() =>{
              handleChangeFormData("windows.cleaning", !formData.windows.cleaning)
            }
            }
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
      {(formData.windows.cleaning || false) && (
        <Flex
          justifyContent={JustifyContent.CENTER}
          css={{ marginTop: "4rem" }}
          gap="2rem"
          flexWrap={FlexWrap.WRAP}
        >
          <Box width="300px">
            <Title size={TitleSize.H4}>{t("pricing.windows.mold")}</Title>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={formData.windows.mold}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeFormData("windows.mold", event.target.value)
              }
            >
              <FormControlLabel
                value={true}
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
                value={false}
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
              handleChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeFormData("windows.area", event.target.value)}
              formValue={formData.windows.area ?? ""}
              placeholder={t("pricing.windows.total-windows-area")}
              name="total-windows-area"
              label={t("pricing.windows.total-windows-area")}
              labelColor={ThemeColors.Primary}
              css={{ width: "300px" }}
              type="number"
            />
            <FormInput
              handleChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeFormData("windows.count", event.target.value)}
              formValue={formData.windows.count ?? ""}
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
