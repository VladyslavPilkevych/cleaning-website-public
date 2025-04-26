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
import {
  ChemicalCleaningType,
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../helpers/types";
import { superbaseSubmitFormAPI } from "../../../utils/api/api";
import { toast } from "react-toastify";
import { convertPricingFormToDb } from "../helpers/utils";

type PaymentBtnProps = {
  formData: PricingPageFormData;
  restartForm: () => void;
  setFormErrors: (errors: PricingPageFormDataErrors) => void;
};

export default function PaymentBtn({ formData, restartForm, setFormErrors }: PaymentBtnProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const validateForm = (): boolean => {
    const errors: PricingPageFormDataErrors = {};

    if (!formData.date) {
      errors.date = t("pricing.errors.date");
    }

    if (!formData.time) {
      errors.time = t("pricing.errors.time");
    }

    if (!formData.property.type) {
      errors.propertyType = t("pricing.errors.propertyType");
    }

    if (!formData.property.area) {
      errors.propertyArea = t("pricing.errors.propertyArea");
    }

    if (!formData.property.rooms) {
      errors.propertyRooms = t("pricing.errors.propertyRooms");
    }

    if (!formData.address.street) {
      errors.addressStreet = t("pricing.errors.addressStreet");
    }

    if (!formData.address.city) {
      errors.addressCity = t("pricing.errors.addressCity");
    }

    if (!formData.address.psc) {
      errors.addressPsc = t("pricing.errors.addressPsc");
    }

    if (!formData.address.house) {
      errors.addressHouse = t("pricing.errors.addressHouse");
    }

    if (!formData.contacts.name) {
      errors.contactsName = t("pricing.errors.contactsName");
    }

    if (!formData.contacts.email) {
      errors.contactsEmail = t("pricing.errors.contactsEmail");
    }

    if (!formData.contacts.phone) {
      errors.contactsPhone = t("pricing.errors.contactsPhone");
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = t("pricing.errors.paymentMethod");
    }

    console.log(errors);
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  console.log(formData);

  const totalPrice = formData.services.reduce((total, service) => {
    return total + service.price * service.count;
  }, formData.totalPrice || 0)
    + (Number(formData?.property?.rooms) * 5)
    + (Number(formData?.property?.area) * 1.1)
    + (formData.property.steps ? 10 : 0)
    + (formData.windows.cleaning ? 
      (Number(formData.windows.count) * Number(formData?.windows?.count || 0) * 10) : 0)
    + (formData.vacuum ? 14.99 : 0)
    + (formData.chemicalCleaning.chemic ? 10 : 0)
    + (formData.chemicalCleaning.type === ChemicalCleaningType.REGULAR ? 10 : 20);

  async function submit() {
    console.log(formData);

    if (!validateForm()) {
      toast.error(t("toast.fill-all-fields"));
      return;
    }

    const toastId = toast.info(t("toast.sending"), { autoClose: false });

    await superbaseSubmitFormAPI(convertPricingFormToDb(formData))
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

    // await savePricesFormAPI(formData)
    //   .then((rsp) => {
    //     if (rsp.status === 200) {
    //       toast.update(toastId, {
    //         render: t("toast.success"),
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 3000,
    //       });
    //       console.log("Contact form submitted successfully");
    //       restartForm();
    //     }
    //   })
    //   .catch((err) => {
    //     toast.update(toastId, {
    //       render: t("toast.error"),
    //       type: "error",
    //       isLoading: false,
    //       autoClose: 3000,
    //     });
    //     console.error("Error submitting contact form:", err);
    //   });
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
