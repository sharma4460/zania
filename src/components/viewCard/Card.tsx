import React, { useState, useEffect } from "react";
import { DocumentType } from "../../interfaceTypes";

const Card: React.FC<DocumentType> = ({ title, type }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleCardClick = (type: string) => {
    setActiveImage(type);
  };
  const handleCloseOverlay = () => {
    setActiveImage(null);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getThumbnail = (type: string) => `/images/${type}.jpg`;
  return (
    <>
      <div className="card">
        <h3>{title}</h3>
        {/* {isLoading && <p>Loading...</p>} */}
        {isLoading && (
          <div className="loading-container">
            <div className="circular-progress"></div>
          </div>
        )}
        <img
          src={getThumbnail(type)}
          onLoad={() => setIsLoading(false)}
          onClick={() => handleCardClick(type)}
          alt={title}
          className={`card-img ${isLoading ? "hidden" : ""}`}
        />
      </div>

      {activeImage && (
        <div
          className={`overlay ${activeImage ? "show" : ""}`}
          onClick={handleCloseOverlay}
        >
          <span className="close" onClick={handleCloseOverlay}>
            &times;
          </span>
          <img
            src={`/images/${activeImage}.jpg`}
            alt={activeImage}
            className="overlay-img"
          />
        </div>
      )}
    </>
  );
};

export { Card };
