import { useState } from "react";
import ThemeColors from "../../utils/theme/colors";
import Button from "../button";
import { ButtonType } from "../button/button.constants";
import Flex from "../flex";
import { FlexDirection } from "../flex/flex.constants";
import { ButtonVariant, ButtonSize } from "../button/button.constants";
import { useTranslation } from "react-i18next";
import FormInput from "../form-input";
import FormTextarea from "../form-textarea";
import { useMediaQuery } from "react-responsive";

type ContactFormProps = {
  labelColor?: ThemeColors,
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm({ labelColor = ThemeColors.White }: ContactFormProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 475px)" });
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",     
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection={FlexDirection.COLUMN} gap="2rem">
        <Flex gap="2rem" width="100%" flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}>
          <FormInput
            handleChange={handleChange}
            formValue={formData.name}
            placeholder={t("contact-form.full-name-placeholder")}
            name="name"
            label={t("contact-form.full-name-label")}
            labelColor={labelColor}
          />

          <FormInput
            handleChange={handleChange}
            formValue={formData.phone}
            placeholder={t("contact-form.phone-number-placeholder")}
            name="phone"
            label={t("contact-form.phone-number-label")}
            labelColor={labelColor}
          />
        </Flex>

        <FormInput
          handleChange={handleChange}
          formValue={formData.email}
          placeholder={t("contact-form.email-placeholder")}
          name="email"
          label={t("contact-form.email-label")}
          labelColor={labelColor}
          css={{
            width: "95%",
          }}
        />

        <FormTextarea
          handleChange={handleChange}
          formValue={formData.message}
          placeholder={t("contact-form.message-placeholder")}
          name="message"
          label={t("contact-form.message-label")}
          labelColor={labelColor}
        />

        <Button
          variant={ButtonVariant.ACCENT}
          size={ButtonSize.LARGE}
          type={ButtonType.SUBMIT}
          css={{ color: ThemeColors.White }}
        >
          {t("contact-form.submit")}
        </Button>
      </Flex>
    </form>
  );
}
