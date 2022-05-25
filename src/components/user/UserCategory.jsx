import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/basic/card.sass";
import "../../styles/user-category.sass";
import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/series-page.sass";
import BlockModalSeries from "./BlockModalSeries";
import BlockModalMovie from "./BlockModalMovie";
import ThumbsBlock from "./ThumbsBlock";
import Play from "../../images/modal/play.svg";
import Plus from "../../images/modal/plus.svg";
import Chevron from "../../images/modal/chevron-down.svg";
import VideoThumbNail from "./VideoThumbNail";

export default function UserCategory({ category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const [play, setPlay] = useState(false);
  console.log("videos:", videos);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  console.log("videos:", videos);
  const videoCards = videos.map((video) => (
    <VideoThumbNail video={video} category={category} />
  ));

  return <div className="user-category-block">{videoCards}</div>;
}
