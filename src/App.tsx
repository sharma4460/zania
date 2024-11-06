import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardGrid } from "./components/cardList";
import { DocumentType } from "./interfaceTypes";
import { getData } from "./api/services";

const App: React.FC = () => {
  const [cards, setCards] = useState<DocumentType[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getData();
      setCards(data);
    })();
  }, []);

  return (
    <div className="App">
      <header style={{ textAlign: "center", color: "#fff" }}>
        <h1>Document Viewer</h1>
      </header>
      <DndProvider backend={HTML5Backend}>
        <CardGrid cards={cards} setCards={setCards} />
      </DndProvider>
    </div>
  );
};

export default App;
