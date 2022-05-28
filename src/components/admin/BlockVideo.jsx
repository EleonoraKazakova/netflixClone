import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";
import { deleteDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import MovieEdit from "./MovieEdit";

export default function BlockVideo({ video, category, state }) {
  const [videos, setVideos] = state;
  const history = useNavigate();
  const { setModal } = useModal();
  const [open, setOpen] = useState(false);

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`netflixClone/${category.id}/content/${id}`);
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
  }

  function edit(event, video) {
    event.preventDefault();
    category.id === "series"
      ? history(`/admin/${category.id}/${video.id}`)
      : setModal(
          <MovieEdit
            categoryID={category.id}
            movieID={video.id}
            setVideo={(movie) =>
              setVideos(
                videos.map((video) => (video.id === movie.id ? movie : video))
              )
            }
          />
        );
  }

  return (
    <div className="category-video">
      <img src={video.imgURL} className="category-img" />
      <div className="category-icon-block">
        <button
          className="category-pen tooltip"
          onClick={(event) => edit(event, video)}
        >
          <img src={Pen} />
          <div className="tooltiptext">Edit</div>
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="category-trash tooltip"
        >
          <img src={Trash} />
          <div className="tooltiptext">Delete</div>
        </button>
      </div>
      {open && (
        <div className="category-modal">
          <div className="category-popup">
            <p>Are you shure you want to delete movie/series?</p>
            <div className="category-modal-buttons">
              <button
                onClick={(event) => onDelete(event, video.id)}
                className="category-modal-button"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="category-modal-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
