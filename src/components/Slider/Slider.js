import React, { useState } from "react";
import estiloSlider from "./Slider.module.css";

const images = [
  "https://s3-alpha-sig.figma.com/img/5e09/70ee/e08bf85778a54c4d8baf3388f8625bda?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nAPYXmDVvL8X5KoXeFr9o0RlsZhTDtgdDPDLSJSH~CcbRQ~bDHlN5azni92h2XfKgMsZNucadvEwGHPycTcoPumjCOC-7sKezAIiz-eShNSE-uJjNXfI4VYaaiAH-pqcLme0jQrpRKwrVCGHWSL3fnbVfTjwaGHS18ejJexp5tY666bI5l47N~YEqA5qN4-VBjlJx9y~JxK2htpRSU1XaB6gAH-CAccDHUatuV7yLORXUCDvWf6C-5h94R6mQjlNapoLakcYx7~Ni0pT-ImlJ8CZofDXXiZIHwTZNhcMR0t-frhA76zQFydZyOfa89isQplAKSImFBkE7zi5DU4xLA__",
  "https://www.figma.com/community/thumbnail?resource_id=842128343887142055&resource_type=plugin",
  "Imagens/3.png",
  "Imagens/4.png",
  "Imagens/5.png",
  "Imagens/6.png",
];

console.log(images);

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
