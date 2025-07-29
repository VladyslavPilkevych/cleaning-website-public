import React from "react";
import CardItem from "./card-item";
import { useTranslation } from "react-i18next";
import { ServiceCardType } from "../../helpers/types";
import { useMediaQuery } from "react-responsive";
import { PricingPageFormData } from "../../helpers/types";
import { ChangeFormDataType } from "../../pricing-page";

type CardContainerProps = {
  cards: ServiceCardType[];
  translationPath: string;
  formData: PricingPageFormData;
  handleChangeFormData: ChangeFormDataType;
};

export default function CardContainer({
  cards,
  translationPath,
  formData,
  handleChangeFormData,
}: CardContainerProps) {
  const { t } = useTranslation("translation");
  const isSmallDesktop = useMediaQuery({ query: "(max-width: 1324px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const handleCardToggle = (id: string, isMulti: boolean) => {
    const existingCard = formData.services.find((card) => card.id === id);
    const price = cards.find((card) => card.text === id)!.price;

    const updatedServices = existingCard
      ? formData.services.filter((card) => card.id !== id)
      : isMulti
      ? [...formData.services, { id, count: 1, price }]
      : [...formData.services, { id, count: 1, price }];

    handleChangeFormData("services", updatedServices);
  };

  const updateCardCount = (id: string, newCount: number) => {
    const updatedServices = formData.services.map((card) =>
      card.id === id ? { ...card, count: newCount } : card
    );

    handleChangeFormData("services", updatedServices);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "repeat(1, 1fr)"
          : isTablet
          ? "repeat(2, 1fr)"
          : isSmallDesktop
          ? "repeat(3, 1fr)"
          : "repeat(5, 1fr)",
        gap: "16px",
        justifyContent: "center",
        padding: "4rem 10rem",
      }}
    >
      {cards.map((card) => (
        <CardItem
          key={card.id}
          id={card.text} // ? TODO: may be changed to card.id in future 
          src={card.src}
          srcInverted={card.srcInverted}
          price={card.price}
          text={t(`${translationPath}.${card.text}`)}
          additionalQuestion={
            card.additionalQuestion &&
            t(`${translationPath}.${card.additionalQuestion}`)
          }
          isMulti={card.isMulti}
          selectedCards={formData.services}
          onToggle={handleCardToggle}
          onUpdateCount={updateCardCount}
        />
      ))}
    </div>
  );
}
