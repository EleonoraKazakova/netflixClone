import { useState, useEffect } from "react";
import {
  getCollection,
  getDocument,
  deleteDocument,
} from "../../scripts/fireStore";
import MovieEdit from "./MovieEdit";
import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";
import SeriesEdit from "./SeriesEdit";
import FormSeries from "./FormSeries";
import FormMovie from "./FormMovie";
import { useParams, useNavigate } from "react-router-dom";

export default function Category({ category }) {
  const params = useParams();
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
  console.log("videos:", videos);

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`netflixClone/${category.id}/content`);
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
                />
              )
        }
      >
        Edit
      </button>
      <button onClick={(event) => onDelete(event, video.id)}>Delete</button>
    </div>
  ));

  return (
    <div>
      {category.id === "series" ? (
        <button
          onClick={() =>
            setModal(
              <FormSeries
                categoryTitle={category.title}
                categoryID={category.id}
                setVideos={setVideos}
              />
            )
          }
        >
          Add {category.title}
        </button>
      ) : (
        <button
          onClick={() =>
            setModal(
              <FormMovie
                categoryTitle={category.title}
                categoryID={category.id}
                setVideos={setVideos}
              />
            )
          }
        >
          Add {category.title}
        </button>
      )}
      {videoCards}
    </div>
  );
}
