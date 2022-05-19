import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../../scripts/fireStore";
import "../../styles/basic/card.sass";
import Youtube from "../Youtube";
import Play from "../../images/modal/play.svg";
import Plus from "../../images/modal/plus.svg";
import ThumbsUp from "../../images/modal/thumbs-up.svg";
import ThumbsDown from "../../images/modal/thumbs-down.svg";
import "../../styles/user-category.sass";

import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function UserCategory({ category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${category.id}/content`;
  const [openThumb, setOpenThumb] = useState(false);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  function openThumbs() {
    setOpenThumb(!openThumb);
  }

  function openModal(event, video) {
    event.preventDefault();
    setModal(
      <div>
        <Youtube link={video.link} />
        <img src={Play} className="user-category-button" />
        <img src={Plus} className="user-category-icon" />
        <img
          src={ThumbsUp}
          className="user-category-icon"
          onClick={openThumbs}
        />
        {!openThumb ? (
          <>
            <img src={ThumbsUp} className="user-category-icon" />
            <img src={ThumbsDown} className="user-category-icon" />
          </>
        ) : null}
        {video.title}
        {video.description}
      </div>
    );
  }

  const videoCards = videos.map((video) => (
    <div>
      {video.title}
      <img
        src={video.imgURL}
        className="card-img"
        onClick={(event) => openModal(event, video)}
      />
    </div>
  ));

  return <div>{videoCards}</div>;
}
