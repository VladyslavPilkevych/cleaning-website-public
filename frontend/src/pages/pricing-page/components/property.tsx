import { ChangeEvent } from "react";
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
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
  PropertyType,
} from "../helpers/types";
import { ChangeFormDataType } from "../pricing-page";

type PropertyProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
  formErrors: PricingPageFormDataErrors;
};

export default function Property({
  formData,
  handleChangeFormData,
  formErrors,
}: PropertyProps) {
  const { t } = useTranslation("translation");

  return (
    <Box css={{ marginTop: "2rem" }}>
      <Flex
        justifyContent={JustifyContent.SPACE_EVENLY}
        gap="2rem"
        flexWrap={FlexWrap.WRAP}
      >
        <Box width="300px">
          <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
            <Title size={TitleSize.H4}>{t("pricing.property.type")}</Title>
          </Flex>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={formData.property.type}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeFormData(
                "property.type",
                event.target.value as PropertyType
              )
            }
          >
            <FormControlLabel
              value={PropertyType.HOUSE}
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
              value={PropertyType.APARTMENT}
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
              value={PropertyType.OFFICE}
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
          {formErrors.propertyType && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.propertyType}
            </Title>
          )}
        </Box>
        <Flex
          justifyContent={JustifyContent.CENTER}
          flexDirection={FlexDirection.COLUMN}
          gap="1rem"
        >
          <Box>
            <FormInput
              handleChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeFormData("property.area", event.target.value)}
              formValue={formData.property.area || ""}
              placeholder={t("pricing.property.area")}
              name="area"
              label={t("pricing.property.area")}
              labelColor={ThemeColors.Primary}
              css={{ width: "300px" }}
              type="number"
            />
            {formErrors.propertyArea && (
              <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                {formErrors.propertyArea}
              </Title>
            )}
          </Box>
          <Box>
            <FormInput
              handleChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeFormData("property.rooms", event.target.value)}
              formValue={formData.property.rooms || ""}
              placeholder={t("pricing.property.rooms")}
              name="rooms"
              label={t("pricing.property.rooms")}
              labelColor={ThemeColors.Primary}
              css={{ width: "300px" }}
              type="number"
            />
            {formErrors.propertyRooms && (
              <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                {formErrors.propertyRooms}
              </Title>
            )}
          </Box>
        </Flex>
        <Box width="300px">
          <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
            <Title size={TitleSize.H4}>{t("pricing.property.steps")}</Title>
          </Flex>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={formData.property.steps}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeFormData("property.steps", event.target.value)
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
                  {t("pricing.property.yes")}
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
