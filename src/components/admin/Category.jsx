import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import MovieEdit from "./MovieEdit";
import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";
import FormSeries from "./FormSeries";
import FormMovie from "./FormMovie";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/category.sass";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";
import Plus from "../../images/modal/plus.svg";
import BlockVideo from "./BlockVideo";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function Category({ category }) {
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState(0);
  const path = `netflixClone/${category.id}/content`;
  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getCollection(path);
        setVideos(data);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, []);

  const videoCards = videos.map((video) => (
    <BlockVideo
      video={video}
      videos={videos}
      category={category}
      setVideos={setVideos}
      key={video.id}
    />
  ));

  function openFormSeries() {
    setModal(
      <FormSeries
        categoryTitle={category.title}
        categoryID={category.id}
        setVideos={setVideos}
      />
    );
  }

  function openFormMovie() {
    setModal(
      <FormMovie
        categoryTitle={category.title}
        categoryID={category.id}
        setVideos={setVideos}
      />
    );
  }

  const buttonText = (
    <div className="category-add-block">
      <img src={Plus} className="category-plus" />
      Add {category.title}
    </div>
  );

  return (
    <div className="category-title-block">
      {status === 0 && <StatusLoading />}
      <p className="category-title">{category.title}</p>
      <div className="category-content">
        {category.id === "series" ? (
          <button onClick={openFormSeries} className="category-add-button">
            {buttonText}
          </button>
        ) : (
          <button onClick={openFormMovie} className="category-add-button">
            {buttonText}
          </button>
        )}
        {videoCards}
      </div>
      {status === 2 && <StatusError />}
    </div>
  );
}
