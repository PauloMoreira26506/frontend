import React from "react";
import styles from "./Navbar.module.css";

const ProfilePicture = ({ onClick, imagem}) => {
  return (
    <>
      <img
        className={styles.avatar}
        src={imagem}
        alt="Foto de perfil"
        onClick={onClick}
        style={{cursor:'pointer'}}
      />
    </>
  );
};

export default ProfilePicture;
