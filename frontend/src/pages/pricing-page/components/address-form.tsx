import { ChangeEvent } from "react";
import Box from "../../../components/box";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../../utils/theme/colors";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import FormInput from "../../../components/form-input";
import Flex from "../../../components/flex";
import { FlexDirection } from "../../../components/flex/flex.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import { useMediaQuery } from "react-responsive";
import { ChangeFormDataType } from "../pricing-page";
import { PricingPageFormData } from "../helpers/types";

export type AddressFormProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
};

export default function AddressForm({
  formData,
  handleChangeFormData,
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
        <FormInput
          name="city"
          label={t("pricing.address-form.city")}
          placeholder={t("pricing.address-form.city-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={formData.address.city || ""}
          // helperText={t("pricing.address-form.city-helper-text")}
        />
        <FormInput
          name="street"
          label={t("pricing.address-form.street")}
          placeholder={t("pricing.address-form.street-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={formData.address.street || ""}
        />
        <FormInput
          name="psc"
          label={t("pricing.address-form.psc")}
          placeholder={t("pricing.address-form.psc-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={formData.address.psc || ""}
        />
      </Flex>
      <Flex
        gap="2rem"
        css={{ width: "100%" }}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
      >
        <FormInput
          name="house"
          label={t("pricing.address-form.house-number")}
          placeholder={t("pricing.address-form.house-number-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={formData.address.house || ""}
        />
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
