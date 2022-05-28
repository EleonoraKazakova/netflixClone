import { Link } from "react-router-dom";
import Chevron from "../../images/modal/chevron-down.svg";
import Play from "../../images/modal/play.svg";
import Plus from "../../images/modal/plus.svg";
import { useModal } from "../../state/ModalProvider";
import "../../styles/basic/card.sass";
import "../../styles/series-page.sass";
import "../../styles/user-category.sass";
import BlockModalMovie from "./BlockModalMovie";
import BlockModalSeries from "./BlockModalSeries";
import ThumbsBlock from "./ThumbsBlock";

export default function VideoThumbNail({ video, category }) {
  const { setModal } = useModal();

  function openModal(event, video) {
    event.preventDefault();
    video.hasOwnProperty("seasons")
      ? setModal(<BlockModalSeries video={video} category={category} />)
      : setModal(<BlockModalMovie video={video} category={category} />);
  }

  return (
    <div className="card-fixed">
      <div className="card-content">
        <img
          src={video.imgURL}
          className="card-img"
          onClick={(event) => openModal(event, video)}
        />

        <div className="card-block">
          <div className="card-small-buttons">
            <div className="card-small-buttons">
              <Link to={`/${category}/${video.id}`}>
                <img src={Play} className="user-category-play" />
              </Link>
              <img src={Plus} className="user-category-plus" />
              <ThumbsBlock />
            </div>
            <img
              src={Chevron}
              className="user-category-plus"
              onClick={(event) => openModal(event, video)}
            />
          </div>
          <p className="card-match">{video.match} % Match</p>
        </div>
      </div>
    </div>
  );
}
