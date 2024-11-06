import React, { useState, useEffect } from "react";
import { DocumentType } from "../../interfaceTypes";

const Card: React.FC<DocumentType> = ({ title, type }) => {
  const [isLoading, setIsLoading] = useState(true);

  // State to store the active image when clicked (for the overlay)
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Function to handle when the card is clicked (opens the image in the overlay)
  const handleCardClick = (type: string) => {
    setActiveImage(type); // Set the clicked image type as active
  };

  // Function to close the overlay when clicked on the overlay background
  const handleCloseOverlay = () => {
    setActiveImage(null); // Reset active image to null to close the overlay
  };

  // useEffect hook to listen for the "Escape" key press to close the overlay
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null); // Close the overlay when Escape key is pressed
      }
    };

    // Adding the event listener to listen for keydown events
    window.addEventListener("keydown", handleEsc);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("keydown", handleEsc);
  }, []); // Empty dependency array means this effect only runs on mount and unmount

  // Helper function to get the image path based on the document type
  const getThumbnail = (type: string) => `/images/${type}.jpg`;

  return (
    <>
      <div className="card">
        {/* Displaying the title of the card */}
        <h3>{title}</h3>

        {/* Display loading state (circular progress indicator) while the image is loading */}
        {isLoading && (
          <div className="loading-container">
            <div className="circular-progress"></div>
          </div>
        )}

        {/* Image element: */}
        <img
          src={getThumbnail(type)} // Set the image source dynamically based on the type
          onLoad={() => setIsLoading(false)} // When the image has loaded, set isLoading to false
          onClick={() => handleCardClick(type)} // When clicked, open the overlay with this image
          alt={title} // Alt text for the image
          className={`card-img ${isLoading ? "hidden" : ""}`} // Hide image while it's loading
        />
      </div>

      {/* Overlay that displays when an image is clicked */}
      {activeImage && (
        <div
          className={`overlay ${activeImage ? "show" : ""}`} // Only show overlay if there's an active image
          onClick={handleCloseOverlay} // Close overlay if clicked on the background
        >
          {/* Close button */}
          <span className="close" onClick={handleCloseOverlay}>
            &times;
          </span>

          {/* Full-size image displayed in the overlay */}
          <img
            src={`/images/${activeImage}.jpg`} // Display the image based on the active image type
            alt={activeImage} // Alt text for the full-size image
            className="overlay-img"
          />
        </div>
      )}
    </>
  );
};

export { Card };
