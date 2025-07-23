import { toast } from "react-toastify";
import { convertPricingFormToDb } from "./utils";
import { PricingPageFormData } from "./types";
import { TFunction } from "i18next";
import { superbaseSubmitFormAPI } from "../../../utils/api/api";

type SubmitPricingFormProps = {
  formData: PricingPageFormData;
  t: TFunction;
  restartForm: () => void;
  totalPrice: number;
};

export async function submitPricingForm({
  formData,
  t,
  restartForm,
  totalPrice,
}: SubmitPricingFormProps) {
  const toastId = toast.info(t("toast.sending"), { autoClose: false });

  try {
    const rsp = await superbaseSubmitFormAPI(convertPricingFormToDb(formData, totalPrice));

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
  } catch (err) {
    toast.update(toastId, {
      render: t("toast.error"),
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
    console.error("Error submitting contact form:", err);
  }
}
