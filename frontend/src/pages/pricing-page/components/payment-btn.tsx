import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import Box from "../../../components/box";
import Button from "../../../components/button";
import Flex from "../../../components/flex";
import { JustifyContent } from "../../../components/flex/flex.constants";
import { useMediaQuery } from "react-responsive";
import { PricingPageFormData } from "../helpers/types";
import { savePricesFormAPI } from "../../../utils/api/api";
import { toast } from "react-toastify";

type PaymentBtnProps = {
  formData: PricingPageFormData;
  restartForm: () => void;
};

export default function PaymentBtn({ formData, restartForm }: PaymentBtnProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const totalPrice = formData.services.reduce((total, service) => {
    return total + service.price * service.count;
  }, 0);

  console.log(totalPrice);

  async function submit() {
    const toastId = toast.info(t("toast.sending"), { autoClose: false });

    await savePricesFormAPI(formData)
      .then((rsp) => {
        if (rsp.status === 200) {
          toast.update(toastId, {
            render: t("toast.success"),
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          console.log("Contact form submitted successfully");
          restartForm();
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
      });

    console.log(formData);
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
          <Title color={ThemeColors.White}>{`${Math.round(totalPrice * 100)/100} EUR`}</Title>
          <Title
            size={TitleSize.H4}
            color={ThemeColors.White}
            css={{ textDecoration: "line-through", opacity: 0.5 }}
          >
            {`${Math.round(totalPrice * 1.4 * 100)/100} EUR`}
          </Title>
        </Box>
      </Button>
    </Flex>
  );
}
