import React from "react";
import button from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";

const MoreButton = ({ height = "100%", to, categoria}) => {
  
  const navigate = useNavigate();
  const handleClick = () => {
    if(categoria){
      navigate(`/store/${categoria.id}`);
    }
    else{
      navigate(to);
    }

  }
  return (
    <div className={button.area} style={{ height }} onClick={handleClick}>
      <p className={button.mais}>+</p>
    </div>
  );
};

export default MoreButton;
