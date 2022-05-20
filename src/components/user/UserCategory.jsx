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
import { useNavigate } from "react-router-dom";
import VideoBlock from "./VideoBlock";

export default function UserCategory({ category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const [play, setPlay] = useState(false);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  function openModal(event, video) {
    event.preventDefault();
    setModal(
      <div>
        {/*<Youtube link={video.link} play={play} />
        <img
          src={Play}
          className="user-category-button"
          onClick={() => setPlay(true)}
        />
        <img src={Plus} className="user-category-icon" />
        <ThumbsBlock />*/}
        <VideoBlock link={video.link} title={video.id} category={category.id} />
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
