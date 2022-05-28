import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from "../../images/modal/play.svg";
import Plus from "../../images/modal/plus.svg";
import { useModal } from "../../state/ModalProvider";
import "../../styles/basic/card.sass";
import "../../styles/user-category.sass";
import Youtube from "../Youtube";
import ThumbsBlock from "./ThumbsBlock";

export default function VideoBlock({ link, titleID, category, title }) {
  const { setModal } = useModal();

  const history = useNavigate();

  function openMovie() {
    history(`/${category}/${titleID}`);
    setModal(null);
  }

  return (
    <div>
      <Youtube link={link} title={title} />
      <div className="user-category-buttons-block">
        <img src={Play} className="user-category-button" onClick={openMovie} />

        <img src={Plus} className="user-category-icon" />
        <ThumbsBlock title={titleID} />
      </div>
    </div>
  );
}
