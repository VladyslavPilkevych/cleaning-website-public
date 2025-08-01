import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import ThemeColors from "../../../../utils/theme/colors";
import Box from "../../../../components/box";
import Button from "../../../../components/button";
import Flex from "../../../../components/flex";
import { JustifyContent } from "../../../../components/flex/flex.constants";
import { useMediaQuery } from "react-responsive";
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../../helpers/types";
import { toast } from "react-toastify";
import { validatePricingPageForm } from "../../helpers/form-validation";
import { submitPricingForm } from "../../helpers/submit-form";
import { mailPaymentCashAPI } from "../../../../utils/api/api";

type PaymentBtnProps = {
  formData: PricingPageFormData;
  restartForm: () => void;
  setFormErrors: (errors: PricingPageFormDataErrors) => void;
  totalPrice: number;
};

export default function PaymentBtn({
  formData,
  restartForm,
  setFormErrors,
  totalPrice,
}: PaymentBtnProps) {
  const { t } = useTranslation("translation");
  const language = useTranslation().i18n.language;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  async function submit() {
    if (!validatePricingPageForm(formData, t, setFormErrors)) {
      toast.error(t("toast.fill-all-fields"));
      return;
    }

    await submitPricingForm({ formData, t, restartForm, totalPrice }).then(async () => {
      await mailPaymentCashAPI(formData, language, totalPrice);
    });
  }

  return (
    <Flex
      justifyContent={JustifyContent.CENTER}
      css={{ margin: "2rem 0 4rem" }}
    >
      <Button
        css={{
          backgroundColor: ThemeColors.Primary,
          padding: "3rem",
          borderRadius: isMobile ? "20px" : "50px",
        }}
        onClick={submit}
      >
        <Box css={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <Title color={ThemeColors.White}>{t("pricing.total")}</Title>
          <Title color={ThemeColors.White}>{`${
            Math.round(totalPrice * 100) / 100
          } EUR`}</Title>
          {totalPrice > 0 && (
            <Title
              size={TitleSize.H4}
              color={ThemeColors.White}
              css={{ textDecoration: "line-through", opacity: 0.5 }}
            >
              {`${Math.round(totalPrice * 1.4 * 100) / 100} EUR`}
            </Title>
          )}
        </Box>
      </Button>
    </Flex>
  );
}
