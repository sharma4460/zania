import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { CardGridProps, DocumentType } from "../../interfaceTypes";
import { Card } from "../viewCard/Card";
import { saveData } from "../../api/services";

// Define the type for draggable items
const ItemType = {
  CARD: "CARD", // The item type for cards in drag-and-drop
};

const CardGrid: React.FC<CardGridProps> = ({ cards, setCards }) => {
  // Function to handle the movement of cards within the grid
  const moveCard = (startIndex: number, endIndex: number) => {
    // Create a copy of the cards array
    const updatedCards = [...cards];

    // Remove the card from the start position
    const [movedCard] = updatedCards.splice(startIndex, 1);

    // Insert the card into the new position (endIndex)
    updatedCards.splice(endIndex, 0, movedCard);

    // Update the position of all cards (to keep their order consistent)
    const positionedCards = updatedCards.map((card, index) => ({
      ...card, // Copy existing card properties
      position: index, // Update the position property with the new index
    }));

    // Update the state with the new card order
    setCards(positionedCards);

    // Save the updated card positions to an external source (e.g., API)
    saveData(positionedCards);
  };

  return (
    <div className="grid">
      {/* Render each card as a draggable item in the grid */}
      {cards.map((card, index) => (
        <DraggableCard
          key={card.type}
          index={index}
          card={card}
          moveCard={moveCard} // Function to move cards
        />
      ))}
    </div>
  );
};

// DraggableCard component that represents each individual draggable card
const DraggableCard: React.FC<{
  card: DocumentType;
  index: number;
  moveCard: (from: number, to: number) => void;
}> = ({ card, index, moveCard }) => {
  // Set up drag functionality using react-dnd
  const [, ref] = useDrag({
    type: ItemType.CARD, // The type of draggable item is a card
    item: { index }, // Item being dragged carries the index of the card
  });

  // Set up drop functionality to handle when a card is dropped onto another
  const [, drop] = useDrop({
    accept: ItemType.CARD, // Accept only items of type CARD (dragged cards)
    hover(item: { index: number }) {
      // Only move the card if it's being hovered over another card
      if (item.index !== index) {
        // Call the moveCard function to swap the positions of the dragged and target cards
        moveCard(item.index, index);
        item.index = index; // Update the dragged item's index after the move
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
