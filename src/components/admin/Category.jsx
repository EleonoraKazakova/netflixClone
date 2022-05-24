import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../../scripts/fireStore";
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

export default function Category({ category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  const videoCards = videos.map((video) => (
    <BlockVideo
      video={video}
      videos={videos}
      category={category}
      setVideos={setVideos}
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
  );
}
