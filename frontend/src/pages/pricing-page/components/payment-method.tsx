import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SvgIcon from "./svg-icon";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import ThemeColors from "../../../utils/theme/colors";
import { useMediaQuery } from "react-responsive";
import { FlexDirection } from "../../../components/flex/flex.constants";

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
export default function PaymentMethod() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [activeOption, setActiveOption] = useState("card");

  return (
    <SelectWrapper style={{ flexDirection: isMobile ? FlexDirection.COLUMN : FlexDirection.ROW }}>
      <Option
        $active={activeOption === "card"}
        onClick={() => setActiveOption("card")}
      >
        {activeOption === "card" ? (
          <SvgIcon src="/icons/check.svg" css={{ marginTop: "6px" }} />
        ) : (
          <SvgIcon src="/icons/credit-card.svg" />
        )}
        <Title
          size={TitleSize.H4}
          fontWeight={FontWeight.Bold}
          color={
            activeOption === "card"
              ? ThemeColors.Background
              : ThemeColors.Primary
          }
        >
          {t("pricing.payment-method.card")}
        </Title>
      </Option>
      <Option
        $active={activeOption === "cash"}
        onClick={() => setActiveOption("cash")}
      >
        {activeOption === "cash" ? (
          <SvgIcon src="/icons/check.svg" css={{ marginTop: "6px" }} />
        ) : (
          <SvgIcon src="/icons/cash.svg" />
        )}
        <Title
          size={TitleSize.H4}
          fontWeight={FontWeight.Bold}
          color={
            activeOption === "cash"
              ? ThemeColors.Background
              : ThemeColors.Primary
          }
        >
          {t("pricing.payment-method.cash")}
        </Title>
      </Option>
    </SelectWrapper>
  );
}
