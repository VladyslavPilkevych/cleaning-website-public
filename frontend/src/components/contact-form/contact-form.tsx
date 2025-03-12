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

type ContactFormProps = {
  labelColor?: ThemeColors,
};

export default function ContactForm({ labelColor = ThemeColors.White }: ContactFormProps) {
  const { t } = useTranslation("translation");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection={FlexDirection.COLUMN} gap="2rem">
        <Flex gap="1rem" width="100%">
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
