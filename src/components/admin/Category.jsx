import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../../scripts/fireStore";
import MovieEdit from "./MovieEdit";
import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";
import FormSeries from "./FormSeries";
import FormMovie from "./FormMovie";
import { useNavigate } from "react-router-dom";

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
    <div>
      {video.title}
      <button
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
        Edit
      </button>
      <button onClick={(event) => onDelete(event, video.id)}>Delete</button>
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
    <div>
      {category.id === "series" ? (
        <button onClick={openFormSeries}>Add {category.title}</button>
      ) : (
        <button onClick={openFormMovie}>Add {category.title}</button>
      )}
      {videoCards}
    </div>
  );
}
