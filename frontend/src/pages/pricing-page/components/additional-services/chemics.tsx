import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import ThemeColors from "../../../../utils/theme/colors";
import Flex from "../../../../components/flex";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import { JustifyContent } from "../../../../components/flex/flex.constants";
import Box from "../../../../components/box";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeFormDataType } from "../../pricing-page";
import { ChemicalCleaningType, PricingPageFormData } from "../../helpers/types";

type ChemicsProps = {
  formData?: PricingPageFormData;
  handleChangeFormData?: ChangeFormDataType;
};

export default function Chemics({
  formData,
  handleChangeFormData,
}: ChemicsProps) {
  const { t } = useTranslation("translation");

  return (
    <Box css={{ marginTop: "2rem" }}>
      <Flex gap="2rem" justifyContent={JustifyContent.CENTER}>
        <Flex>
          <Checkbox
            checked={formData?.chemicalCleaning?.chemic ?? false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeFormData?.(
                "chemicalCleaning.chemic",
                event.target.checked
              );
            }}
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
      {formData?.chemicalCleaning?.chemic && (
        <Flex justifyContent={JustifyContent.CENTER}>
          <Box width="300px">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={formData?.chemicalCleaning?.type || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeFormData?.(
                  "chemicalCleaning.type",
                  event.target.value
                );
              }}
            >
              <FormControlLabel
                value={ChemicalCleaningType.REGULAR}
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
                    {t("pricing.services.chemics.regular")}
                  </Title>
                }
              />
              <FormControlLabel
                value={ChemicalCleaningType.BIO}
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
                    {t("pricing.services.chemics.bio")}
                  </Title>
                }
              />
            </RadioGroup>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
