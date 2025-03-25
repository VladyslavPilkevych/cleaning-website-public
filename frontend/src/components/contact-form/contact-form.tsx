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
import { contactFormAPI } from "../../utils/api/api";
import { toast } from "react-toastify";
import Title from "../title";
import { TitleSize } from "../title/title.constants";
import Box from "../box";

type ContactFormProps = {
  labelColor?: ThemeColors;
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default function ContactForm({
  labelColor = ThemeColors.White,
}: ContactFormProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 475px)" });

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormErrors((prev) => ({ ...prev, [name]: undefined }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = t("contact-form.errors.name");
    }

    if (!formData.email.trim()) {
      errors.email = t("contact-form.errors.email");
    }

    if (!formData.phone.trim()) {
      errors.phone = t("contact-form.errors.phone");
    }

    if (!formData.message.trim()) {
      errors.message = t("contact-form.errors.message");
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data:", formData);
  
    if (!validateForm()) {
      toast.error(t("toast.fill-all-fields"));
      return;
    }

    const toastId = toast.info(t("toast.sending"), { autoClose: false });

    await contactFormAPI(formData)
      .then((rsp) => {
        if (rsp.status === 200) {
          toast.update(toastId, {
            render: t("toast.success"),
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          console.log("Contact form submitted successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      })
      .catch((err) => {
        toast.update(toastId, {
          render: t("toast.error"),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error("Error submitting contact form:", err);
        setFormData((prev) => ({ ...prev, email: "" }));
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={FlexDirection.COLUMN} gap="2rem">
          <Flex
            gap="2rem"
            width="100%"
            flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
          >
            <Box>
              <FormInput
                handleChange={handleChange}
                formValue={formData.name}
                placeholder={t("contact-form.full-name-placeholder")}
                name="name"
                label={t("contact-form.full-name-label")}
                labelColor={labelColor}
              />
              {formErrors.name && (
                <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                  {formErrors.name}
                </Title>
              )}
            </Box>
            <Box>
              <FormInput
                handleChange={handleChange}
                formValue={formData.phone}
                placeholder={t("contact-form.phone-number-placeholder")}
                name="phone"
                label={t("contact-form.phone-number-label")}
                labelColor={labelColor}
              />
              {formErrors.phone && (
                <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                  {formErrors.phone}
                </Title>
              )}
            </Box>
          </Flex>
          <Box>
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
            {formErrors.email && (
              <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                {formErrors.email}
              </Title>
            )}
          </Box>
          <Box>
            <FormTextarea
              handleChange={handleChange}
              formValue={formData.message}
              placeholder={t("contact-form.message-placeholder")}
              name="message"
              label={t("contact-form.message-label")}
              labelColor={labelColor}
            />
            {formErrors.message && (
              <Title size={TitleSize.H6} color={ThemeColors.Warning}>
                {formErrors.message}
              </Title>
            )}
          </Box>

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
    </>
  );
}
