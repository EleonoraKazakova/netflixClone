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

  /*const series = videos.map((season) => (
    <div className="user-category-series">
      <img src={season.imgURL} />
      {season.title}
      {season.description}
    </div>
  ));*/

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

  function openModalSeries(event, video) {
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

        {video.seasons.map((season) => (
          <div className="user-category-series">
            <img src={season.imgURL} className="user-category-img" />
            {season.title}
            {season.description}
          </div>
        ))}
      </div>
    );
  }
  const videoCards = videos.map((video) => (
    <div>
      {video.title}
      <img
        src={video.imgURL}
        className="card-img"
        onClick={(event) =>
          "seasons" in video
            ? openModalSeries(event, video)
            : openModal(event, video)
        }
      />
    </div>
  ));

  return <div>{videoCards}</div>;
}
