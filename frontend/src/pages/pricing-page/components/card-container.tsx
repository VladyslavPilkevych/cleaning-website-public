import React, { useState } from "react";
import CardItem from "./card-item";
import { cards } from "./card-container.cards";
import { useTranslation } from "react-i18next";

export default function CardContainer() {
  const { t } = useTranslation("translation");
  
  const [selectedCards, setSelectedCards] = useState<{ id: string; count: number }[]>([]);

  const handleCardToggle = (id: string, isMulti: boolean) => {
    setSelectedCards((prev) => {
      const existingCard = prev.find((card) => card.id === id);

      console.log(prev, existingCard);
      if (existingCard) {
        return prev.filter((card) => card.id !== id);
      } else {
        return isMulti
          ? [...prev, { id, count: 1 }]
          : [...prev, { id, count: 1 }];
      }
    });
  };

  const updateCardCount = (id: string, newCount: number) => {
    setSelectedCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, count: newCount } : card))
    );

    console.log("Selected cards:", selectedCards);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", justifyContent: "center", padding: "4rem 10rem" }}>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          src={card.src}
          srcInverted={card.srcInverted}
          text={t(`pricing.services.cards.${card.text}`)}
          isMulti={card.isMulti}
          selectedCards={selectedCards}
          onToggle={handleCardToggle}
          onUpdateCount={updateCardCount}
        />
      ))}
    </div>
  );
}