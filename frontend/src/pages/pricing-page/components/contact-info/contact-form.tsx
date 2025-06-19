import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../../../utils/theme/colors";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import FormInput from "../../../../components/form-input";
import Flex from "../../../../components/flex";
import { FlexDirection } from "../../../../components/flex/flex.constants";
import { FontWeight } from "../../../../utils/theme/fonts";
import FormTextarea from "../../../../components/form-textarea";
import { useMediaQuery } from "react-responsive";
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../../helpers/types";
import { ChangeFormDataType } from "../../pricing-page";
import Box from "../../../../components/box";

type ContactFormProps = {
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
  formErrors: PricingPageFormDataErrors;
};

export default function ContactForm({
  formData,
  handleChangeFormData,
  formErrors,
}: ContactFormProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    handleChangeFormData("contacts." + name, value);
  };

  return (
    <Flex
      flexDirection={FlexDirection.COLUMN}
      css={{
        padding: isMobile ? "0 2rem" : "0 10%",
        width: "auto",
        gap: "2rem",
        marginTop: "6rem",
      }}
    >
      <Title
        size={isMobile ? TitleSize.H4 : TitleSize.H3}
        fontWeight={FontWeight.Bold}
      >
        {t("pricing.contact-form.title")}
      </Title>
      <Flex
        gap="2rem"
        css={{ width: "100%" }}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
      >
        <Box>
          <FormInput
            name="name"
            label={t("pricing.contact-form.name")}
            placeholder={t("pricing.contact-form.name-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.contacts.name || ""}
          />
          {formErrors.contactsName && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.contactsName}
            </Title>
          )}
        </Box>
        <Box>
          <FormInput
            name="phone"
            label={t("pricing.contact-form.phone")}
            placeholder={t("pricing.contact-form.phone-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.contacts.phone || ""}
          />
          {formErrors.contactsPhone && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.contactsPhone}
            </Title>
          )}
        </Box>
        <Box>
          <FormInput
            name="email"
            label={t("pricing.contact-form.email")}
            placeholder={t("pricing.contact-form.email-placeholder")}
            labelColor={ThemeColors.Primary}
            handleChange={handleChange}
            formValue={formData.contacts.email || ""}
          />
          {formErrors.contactsEmail && (
            <Title size={TitleSize.H6} color={ThemeColors.Warning}>
              {formErrors.contactsEmail}
            </Title>
          )}
        </Box>
      </Flex>

      <FormTextarea
        handleChange={handleChange}
        formValue={formData.contacts.message || ""}
        placeholder={t("pricing.contact-form.message-placeholder")}
        name="message"
        label={t("pricing.contact-form.message")}
        labelColor={ThemeColors.Primary}
        css={{ width: isMobile ? "90%" : "97%" }}
      />
    </Flex>
  );
}
