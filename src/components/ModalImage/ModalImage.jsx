import React, { useEffect, useState } from "react";
import "./ModalImage.scss";
import Left from "../../images/arrow-left.png";
import Right from "../../images/arrow-right.png";
import { useClient } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

const Modal = ({ onClose, oneClient }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(oneClient);
  const images = oneClient.images;

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div onClick={onClose} className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img
            src={images[currentImageIndex].image}
            alt={`Image ${currentImageIndex + 1}`}
          />
          <button className="prev-button" onClick={handlePrev}>
            <img src={Left} alt="" />
          </button>
          <button className="next-button" onClick={handleNext}>
            <img src={Right} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
