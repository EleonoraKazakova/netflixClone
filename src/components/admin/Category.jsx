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

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`netflixClone/${category.id}/content/${id}`);
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
  }

  const videoCards = videos.map((video) => (
    <div className="category-video">
      <img src={video.imgURL} className="category-img" />
      <div className="category-icon-block">
        <button
          className="category-pen"
          onClick={() =>
            category.id === "series"
              ? history(`/admin/${category.id}/${video.id}`)
              : setModal(
                  <MovieEdit
                    categoryID={category.id}
                    movieID={video.id}
                    movieTitle={video.title}
                    stateVideos={[videos, setVideos]}
                  />
                )
          }
        >
          <img src={Pen} />
        </button>
        <button
          onClick={(event) => onDelete(event, video.id)}
          className="category-trash"
        >
          <img src={Trash} />
        </button>
      </div>
    </div>
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

  return (
    <div className="category-content">
      {category.id === "series" ? (
        <button onClick={openFormSeries} className="category-add-button">
          Add {category.title}
        </button>
      ) : (
        <button onClick={openFormMovie} className="category-add-button">
          Add {category.title}
        </button>
      )}
      {videoCards}
    </div>
  );
}
