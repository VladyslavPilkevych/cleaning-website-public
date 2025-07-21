import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SvgIcon from "../common/svg-icon";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";
import { FontWeight } from "../../../../utils/theme/fonts";
import ThemeColors from "../../../../utils/theme/colors";
import { useMediaQuery } from "react-responsive";
import {
  FlexDirection,
  JustifyContent,
} from "../../../../components/flex/flex.constants";
import {
  PAYMENT_METHOD,
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../../helpers/types";
import { ChangeFormDataType } from "../../pricing-page";
import Flex from "../../../../components/flex";
import CheckoutForm from "./checkout-form";
import PaymentBtn from "./payment-btn";
import { validatePricingPageForm } from "../../helpers/form-validation";
import { toast } from "react-toastify";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../../utils/api/stripe";

const SelectWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Option = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px 20px;
  border: 1px solid ${ThemeColors.Background};
  border-radius: 5px;
  background-color: ${({ $active }) =>
    $active ? ThemeColors.Primary : ThemeColors.Background};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? ThemeColors.Primary : ThemeColors.Background};
  }
`;

type PaymentMethodProps = {
  formData: PricingPageFormData;
  formErrors: PricingPageFormDataErrors;
  handleChangeFormData: ChangeFormDataType;
  restartForm: () => void;
  setFormErrors: React.Dispatch<
    React.SetStateAction<PricingPageFormDataErrors>
  >;
  priceDeliveryExtra: number | null;
};

export default function PaymentMethod({
  formData,
  formErrors,
  handleChangeFormData,
  restartForm,
  setFormErrors,
  priceDeliveryExtra,
}: PaymentMethodProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  console.log(formData);

  const totalPrice = calculateTotalPrice(formData, priceDeliveryExtra);

  function onCardPaymentSelection() {
    if (!validatePricingPageForm(formData, t, setFormErrors)) {
      toast.error(t("toast.fill-all-fields"));
      return;
    }
    handleChangeFormData("paymentMethod", PAYMENT_METHOD.CARD);
  }

  function onCashPaymentSelection() {
    handleChangeFormData("paymentMethod", PAYMENT_METHOD.CASH);
  }

  console.log("Stripe key", process.env.REACT_APP_STRIPE_KEY);

  return (
    <>
      <Flex flexDirection={FlexDirection.COLUMN}>
        <SelectWrapper
          style={{
            flexDirection: isMobile ? FlexDirection.COLUMN : FlexDirection.ROW,
          }}
        >
          <Option
            $active={formData.paymentMethod === PAYMENT_METHOD.CARD}
            onClick={onCardPaymentSelection}
          >
            {formData.paymentMethod === PAYMENT_METHOD.CARD ? (
              <SvgIcon src="/icons/check.svg" css={{ marginTop: "6px" }} />
            ) : (
              <SvgIcon src="/icons/credit-card.svg" />
            )}
            <Title
              size={TitleSize.H4}
              fontWeight={FontWeight.Bold}
              color={
                formData.paymentMethod === PAYMENT_METHOD.CARD
                  ? ThemeColors.Background
                  : ThemeColors.Primary
              }
            >
              {t("pricing.payment-method.card")}
            </Title>
          </Option>
          <Option
            $active={formData.paymentMethod === PAYMENT_METHOD.CASH}
            onClick={onCashPaymentSelection}
          >
            {formData.paymentMethod === PAYMENT_METHOD.CASH ? (
              <SvgIcon src="/icons/check.svg" css={{ marginTop: "6px" }} />
            ) : (
              <SvgIcon src="/icons/cash.svg" />
            )}
            <Title
              size={TitleSize.H4}
              fontWeight={FontWeight.Bold}
              color={
                formData.paymentMethod === PAYMENT_METHOD.CASH
                  ? ThemeColors.Background
                  : ThemeColors.Primary
              }
            >
              {t("pricing.payment-method.cash")}
            </Title>
          </Option>
        </SelectWrapper>
        {formErrors.paymentMethod && (
          <Title
            size={TitleSize.H5}
            fontWeight={FontWeight.Bold}
            color={ThemeColors.Warning}
          >
            {formErrors.paymentMethod}
          </Title>
        )}
      </Flex>

      <Flex
        justifyContent={JustifyContent.CENTER}
        css={{ margin: "4rem 1rem 0" }}
      >
        <Title size={TitleSize.H5}>{t("pricing.prepayment-alert")}</Title>
      </Flex>
      {totalPrice &&
        (formData.paymentMethod === PAYMENT_METHOD.CARD ? (
          JSON.stringify(formErrors) === "{}" && stripePromise && (
              <Elements
                stripe={stripePromise}
                options={{
                  appearance: { theme: "stripe" },
                }}
              >
            <CheckoutForm totalPrice={totalPrice} key={totalPrice} formEmail={formData.contacts.email} />
            </Elements>
          )
        ) : (
          <PaymentBtn
            totalPrice={totalPrice}
            formData={formData}
            restartForm={restartForm}
            setFormErrors={setFormErrors}
          />
        ))}
    </>
  );
}
