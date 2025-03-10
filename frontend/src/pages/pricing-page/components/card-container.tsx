import React, { useState } from "react";
import CardItem from "./card-item";

export default function CardContainer() {
  const [selectedCards, setSelectedCards] = useState<{ id: string; count: number }[]>([]);

  const handleCardToggle = (id: string, isMulti: boolean) => {
    setSelectedCards((prev) => {
      const existingCard = prev.find((card) => card.id === id);

      if (existingCard) {
        return prev.filter((card) => card.id !== id);
      } else {
        return isMulti
          ? [...prev, { id, count: 1 }]
          : [{ id, count: 1 }];
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
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <CardItem
        id="1"
        src="./icons/cards/oven.svg"
        text="Oven Cleaning"
        isMulti={false}
        selectedCards={selectedCards}
        onToggle={handleCardToggle}
        onUpdateCount={updateCardCount}
      />
      <CardItem
        id="2"
        src="./icons/cards/oven.svg"
        text="Ironing"
        isMulti={true}
        selectedCards={selectedCards}
        onToggle={handleCardToggle}
        onUpdateCount={updateCardCount}
      />
    </div>
  );
}