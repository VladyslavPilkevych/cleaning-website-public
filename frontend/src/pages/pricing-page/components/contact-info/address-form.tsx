import { ChangeEvent } from "react";
import Box from "../../../../components/box";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../../../utils/theme/colors";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import FormInput from "../../../../components/form-input";
import Flex from "../../../../components/flex";
import { FlexDirection } from "../../../../components/flex/flex.constants";
import { FontWeight } from "../../../../utils/theme/fonts";
import { useMediaQuery } from "react-responsive";
import { ChangeFormDataType } from "../../pricing-page";
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../../helpers/types";
import { DeliveryCalculator } from "./delivery-calculator";

export type AddressFormProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
  formErrors: PricingPageFormDataErrors;
  priceDeliveryExtra: number | null;
  setPriceDeliveryExtra: (price: number | null) => void;
};

export default function AddressForm({
  formData,
  handleChangeFormData,
  formErrors,
  priceDeliveryExtra,
  setPriceDeliveryExtra,
}: AddressFormProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    handleChangeFormData("address." + name, value);
  };

  return (
    <Flex
      flexDirection={FlexDirection.COLUMN}
      css={{
        padding: isMobile ? "0 2rem" : "0 10%",
        width: "auto",
        gap: "2rem",
      }}
    >
      <Title
        size={isMobile ? TitleSize.H4 : TitleSize.H3}
        fontWeight={FontWeight.Bold}
      >
        {t("pricing.address-form.title")}
      </Title>
      <Title size={TitleSize.H5}>
        {t("pricing.address-form.city-helper-text")}
      </Title>
      <Flex
        gap="2rem"
        css={{ width: "100%", position: "relative" }}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
      >
        {/* <Box>
          <FormInput
            name="city"
            label={t("pricing.address-form.city")}
            placeholder={t("pricing.address-form.city-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.address.city || ""}
            // helperText={t("pricing.address-form.city-helper-text")}
          />
          {formErrors.addressCity && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.addressCity}
            </Title>
          )}
        </Box> */}
        {/* <Box>
          <FormInput
            name="street"
            label={t("pricing.address-form.street")}
            placeholder={t("pricing.address-form.street-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.address.street || ""}
          />
          {formErrors.addressStreet && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.addressStreet}
            </Title>
          )}
        </Box> */}
        <DeliveryCalculator priceDeliveryExtra={priceDeliveryExtra} setPriceDeliveryExtra={setPriceDeliveryExtra} handleChangeFormData={handleChangeFormData} />
        {/* <Box>
          <FormInput
            name="psc"
            label={t("pricing.address-form.psc")}
            placeholder={t("pricing.address-form.psc-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.address.psc || ""}
          />
          {formErrors.addressPsc && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.addressPsc}
            </Title>
          )}
        </Box> */}
      </Flex>
      <Flex
        gap="2rem"
        css={{ width: "100%" }}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
      >
        <Box>
          <FormInput
            name="house"
            label={t("pricing.address-form.house-number")}
            placeholder={t("pricing.address-form.house-number-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.address.house || ""}
          />
          {formErrors.addressHouse && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.addressHouse}
            </Title>
          )}
        </Box>
        <FormInput
          name="floor"
          label={t("pricing.address-form.floor")}
          placeholder={t("pricing.address-form.floor-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={formData.address.floor || ""}
        />
        <Box />
      </Flex>
    </Flex>
  );
}
