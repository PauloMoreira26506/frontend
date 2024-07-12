import React, { useState } from "react";
import estiloSlider from "./Slider.module.css";

const Slider = ({prints}) => {
  const [slideAtual, setSlideAtual] = useState(0);

  const irParaSlide = (index) => {
    setSlideAtual(index);
  };
  return (
    <div className={estiloSlider.container}>
      {prints.map((image, index) => (
        <div
          key={index}
          className={estiloSlider.slide}
          style={{ display: slideAtual === index ? "block" : "none" }}
        >
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <div className={`${estiloSlider.pontos} m-5`}>
        {prints.map((_, index) => (
          <span
            key={index}
            className={`${estiloSlider.dot} ${
              slideAtual === index ? `${estiloSlider.active}` : ""
            }`}
            onClick={() => irParaSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
