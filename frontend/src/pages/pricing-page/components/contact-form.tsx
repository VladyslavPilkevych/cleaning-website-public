import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../../utils/theme/colors";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import FormInput from "../../../components/form-input";
import Flex from "../../../components/flex";
import { FlexDirection } from "../../../components/flex/flex.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import FormTextarea from "../../../components/form-textarea";
import { useMediaQuery } from "react-responsive";

export default function ContactForm() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [contactFormData, setContactFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex
      flexDirection={FlexDirection.COLUMN}
      css={{ padding: isMobile ? "0 2rem" : "0 10%", width: "auto", gap: "2rem", marginTop: "6rem" }}
    >
      <Title size={isMobile ? TitleSize.H4 : TitleSize.H3} fontWeight={FontWeight.Bold}>
        {t("pricing.contact-form.title")}
      </Title>
      <Flex gap="2rem" css={{ width: "100%" }} flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}>
        <FormInput
          name="name"
          label={t("pricing.contact-form.name")}
          placeholder={t("pricing.contact-form.name-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={contactFormData.name}
        />
        <FormInput
          name="phone"
          label={t("pricing.contact-form.phone")}
          placeholder={t("pricing.contact-form.phone-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={contactFormData.phone}
        />
        <FormInput
          name="email"
          label={t("pricing.contact-form.email")}
          placeholder={t("pricing.contact-form.email-placeholder")}
          labelColor={ThemeColors.Primary}
          handleChange={handleChange}
          formValue={contactFormData.email}
        />
      </Flex>

      <FormTextarea
        handleChange={handleChange}
        formValue={contactFormData.message}
        placeholder={t("pricing.contact-form.message-placeholder")}
        name="message"
        label={t("pricing.contact-form.message")}
        labelColor={ThemeColors.Primary}
        css={{ width: isMobile ? '90%' : '97%' }}
      />
    </Flex>
  );
}
