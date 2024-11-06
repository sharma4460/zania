import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { CardGridProps, DocumentType } from "../../interfaceTypes";
import { Card } from "../viewCard/Card";
import { saveData } from "../../api/services";

const ItemType = {
  CARD: "CARD",
};

const CardGrid: React.FC<CardGridProps> = ({ cards, setCards }) => {
  const moveCard = (startIndex: number, endIndex: number) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(startIndex, 1);
    updatedCards.splice(endIndex, 0, movedCard);
    const positionedCards = updatedCards.map((card, index) => ({
      ...card,
      position: index,
    }));
    setCards(positionedCards);
    saveData(positionedCards);
  };

  return (
    <div className="grid">
      {cards.map((card, index) => (
        <DraggableCard
          key={card.type}
          index={index}
          card={card}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

const DraggableCard: React.FC<{
  card: DocumentType;
  index: number;
  moveCard: (from: number, to: number) => void;
}> = ({ card, index, moveCard }) => {
  const [, ref] = useDrag({
    type: ItemType.CARD,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <Card title={card.title} type={card.type} position={card.position} />
    </div>
  );
};

export { CardGrid };
