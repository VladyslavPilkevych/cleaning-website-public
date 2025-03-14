import React, { useState } from "react";
import Box from "../../../components/box";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../../utils/theme/colors";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import FormInput from "../../../components/form-input";
import Flex from "../../../components/flex";
import { FlexDirection } from "../../../components/flex/flex.constants";
import { FontWeight } from "../../../utils/theme/fonts";

export default function AddressForm() {
  const { t } = useTranslation("translation");

  const [addressFormData, setAddressFormData] = useState({
    city: "",
    street: "",
    houseNumber: "",
    floor: "",
    psc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex flexDirection={FlexDirection.COLUMN} css={{ padding: "0 15rem", width: 'auto', gap: '2rem' }}>
      <Title size={TitleSize.H3} fontWeight={FontWeight.Bold}>{t("pricing.address-form.title")}</Title>
      <Flex gap="2rem" css={{width: '100%'}}>
        <FormInput
          name="city"
          label={t("pricing.address-form.city")}
          placeholder={t("pricing.address-form.city-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={addressFormData.city}
        />
        <FormInput
          name="street"
          label={t("pricing.address-form.street")}
          placeholder={t("pricing.address-form.street-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={addressFormData.street}
        />
        <FormInput
          name="psc"
          label={t("pricing.address-form.psc")}
          placeholder={t("pricing.address-form.psc-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={addressFormData.psc}
        />
      </Flex>
      <Flex gap="2rem" css={{width: '100%'}}>
        <FormInput
          name="houseNumber"
          label={t("pricing.address-form.house-number")}
          placeholder={t("pricing.address-form.house-number-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={addressFormData.houseNumber}
        />
        <FormInput
          name="floor"
          label={t("pricing.address-form.floor")}
          placeholder={t("pricing.address-form.floor-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={addressFormData.floor}
        />
        <Box />
      </Flex>
    </Flex>
  );
}
