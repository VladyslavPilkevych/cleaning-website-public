import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SvgIcon from "./svg-icon";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import ThemeColors from "../../../utils/theme/colors";
import { useMediaQuery } from "react-responsive";
import {
  FlexDirection,
  JustifyContent,
} from "../../../components/flex/flex.constants";
import {
  PAYMENT_METHOD,
  PricingPageFormData,
  PricingPageFormDataErrors,
} from "../helpers/types";
import { ChangeFormDataType } from "../pricing-page";
import Flex from "../../../components/flex";
import CheckoutForm from "./CheckoutForm";
import PaymentBtn from "./payment-btn";

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
};

export default function PaymentMethod({
  formData,
  formErrors,
  handleChangeFormData,
  restartForm,
  setFormErrors,
}: PaymentMethodProps) {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
            onClick={() =>
              handleChangeFormData("paymentMethod", PAYMENT_METHOD.CARD)
            }
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
            onClick={() =>
              handleChangeFormData("paymentMethod", PAYMENT_METHOD.CASH)
            }
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
      {formData.paymentMethod === PAYMENT_METHOD.CARD ? (
        <CheckoutForm />
      ) : (
        <PaymentBtn
          formData={formData}
          restartForm={restartForm}
          setFormErrors={setFormErrors}
        />
      )}
    </>
  );
}
