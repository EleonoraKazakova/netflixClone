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
import "../../styles/series-page.sass";
import BlockModalSeries from "./BlockModalSeries";

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
  function openModal(event, video) {
    event.preventDefault();
    setModal(
      <div>
        <VideoBlock
          link={video.link}
          titleID={video.id}
          category={category.id}
          title={video.title}
        />
        <div className="user-category-match-year">
          <p className="user-category-match">{video.match}% Match</p>
          {video.year}
        </div>

        <p className="user-category-match-year"> {video.description}</p>
      </div>
    );
  }

  const videoCards = videos.map((video) => (
    <div className="card-content">
      <img
        src={video.imgURL}
        className="card-img"
        onClick={(event) =>
          video.hasOwnProperty("seasons")
            ? setModal(<BlockModalSeries video={video} category={category} />)
            : openModal(event, video)
        }
      />

      <div className="card-block">123</div>
    </div>
  ));

  return <div>{videoCards}</div>;
}
