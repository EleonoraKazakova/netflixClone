import Trash from "../../images/trash.svg";
import Pen from "../../images/pen.svg";
import { deleteDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import { useNavigate } from "react-router-dom";
import MovieEdit from "./MovieEdit";

export default function BlockVideo({ video, videos, category, setVideos }) {
  const history = useNavigate();
  const { setModal } = useModal();

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
            movieTitle={video.title}
            stateVideos={[videos, setVideos]}
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
          onClick={(event) => onDelete(event, video.id)}
          className="category-trash tooltip"
        >
          <img src={Trash} />
          <div className="tooltiptext">Delete</div>
        </button>
      </div>
    </div>
  );
}
