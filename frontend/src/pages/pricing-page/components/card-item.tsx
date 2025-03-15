import React from "react";
import styled, { css } from "styled-components";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import SvgIcon from "./svg-icon";
import { FontWeight } from "../../../utils/theme/fonts";
import Flex from "../../../components/flex";
import { FlexDirection } from "../../../components/flex/flex.constants";

const Card = styled.div<{ selected?: boolean }>`
  height: 220px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid ${ThemeColors.White};
  border-radius: 2px;
  background-color: ${ThemeColors.Light};
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 1rem;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${ThemeColors.Secondary};
      border: 2px solid ${ThemeColors.Secondary};
    `}
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 11px 0;

  button {
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid ${ThemeColors.White};
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 22px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  span {
    padding: 12px 20px;
    border-radius: 4px;
    background-color: ${ThemeColors.Light};
    color: ${ThemeColors.Secondary};
    font-family: "Montserrat";
    font-size: 24px;
    font-weight: bold;
  }
`;

type CardItemProps = {
  id: string;
  src: string;
  srcInverted: string;
  text: string;
  isMulti: boolean;
  selectedCards: { id: string; count: number }[];
  onToggle: (id: string, isMulti: boolean) => void;
  onUpdateCount: (id: string, newCount: number) => void;
  additionalQuestion?: string;
};

export default function CardItem({
  id,
  src,
  srcInverted,
  text,
  isMulti,
  additionalQuestion,
  selectedCards,
  onToggle,
  onUpdateCount,
}: CardItemProps) {
  const isSelected = selectedCards.some((card) => card.id === id);
  const count = selectedCards.find((card) => card.id === id)?.count || 1;

  const handleCardClick = () => {
    const selectedCard = selectedCards.find((card) => card.id === id);

    if (isMulti) {
      if (selectedCard && selectedCard.count > 1) {
        return;
      }
    }

    onToggle(id, isMulti);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateCount(id, count + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count === 1) {
      onToggle(id, isMulti);
      return;
    }
    onUpdateCount(id, Math.max(1, count - 1));
  };

  return (
    <Card onClick={handleCardClick} selected={isSelected}>
      {isMulti && isSelected ? (
        <Flex flexDirection={FlexDirection.COLUMN}>
          {additionalQuestion && (
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Background}
              fontWeight={FontWeight.Bold}
            >
              {additionalQuestion}
            </Title>
          )}
        <Counter>
          <button onClick={handleDecrement}>-</button>
          <span>{count}</span>
          <button onClick={handleIncrement}>+</button>
        </Counter>
        </Flex>
      ) : (
        <SvgIcon src={isSelected ? srcInverted : src} />
      )}
      <Title
        size={TitleSize.H6}
        color={isSelected ? ThemeColors.White : ThemeColors.Secondary}
        fontWeight={FontWeight.Bold}
      >
        {text}
      </Title>
      <Flex
        backgroundColor={ThemeColors.Highlight}
        gap="0.5rem"
        css={{ padding: "0.5rem" }}
      >
        <Title
          size={TitleSize.H5}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          14.99 EUR
        </Title>
        <Title
          size={TitleSize.H6}
          css={{ opacity: 0.5, textDecoration: "line-through" }}
        >
          20.00 EUR
        </Title>
      </Flex>
    </Card>
  );
}
