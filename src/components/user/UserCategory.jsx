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

  function openModal(event, video) {
    event.preventDefault();
    video.hasOwnProperty("seasons")
      ? setModal(<BlockModalSeries video={video} category={category} />)
      : setModal(<BlockModalMovie video={video} category={category} />);
  }

  const videoCards = videos.map((video) => (
    <div className="card-fixed">
      <div className="card-content">
        <img
          src={video.imgURL}
          className="card-img"
          onClick={(event) => openModal(event, video)}
        />

        <div className="card-block">123</div>
      </div>
    </div>
  ));

  return <div className="user-category-block">{videoCards}</div>;
}
