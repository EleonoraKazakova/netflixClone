import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/basic/card.sass";
import Youtube from "../Youtube";
import Play from "../../images/modal/play.svg";
import Plus from "../../images/modal/plus.svg";
import "../../styles/user-category.sass";
import ThumbsBlock from "./ThumbsBlock";
import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function VideoBlock({ link, title, category }) {
  const { setModal } = useModal();

  const history = useNavigate();
  const [play, setPlay] = useState(false);

  function openMovie() {
    history(`/${category}/${title}`);
    setModal(null);
  }

  return (
    <div>
      <Youtube link={link} play={play} />

      <img src={Play} className="user-category-button" onClick={openMovie} />

      <img src={Plus} className="user-category-icon" />
      <ThumbsBlock title={title} />
    </div>
  );
}
