import { useModal } from "../../state/ModalProvider";
import EpisodeEdit from "./EpisodeEdit";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";
import "../../styles/admin/episode.sass";

export default function Episode({ episode, stateSeries, onUpdateEpisodes }) {
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  return (
    <div className="episode-card">
      <img src={episode.imgURL} className="episode-img" />

      <div className="episode-card-content">
        {episode.title}, {episode.season},{episode.episode}
        <div className="episode-card-buttons">
          <button
            className="episode-tooltip"
            onClick={() =>
              setModal(
                <EpisodeEdit
                  stateSeries={[series, setSeries]}
                  episode={episode}
                />
              )
            }
          >
            <img src={Pen} className="episode-pen" />
            <div className="episode-tooltiptext">Edit episode</div>
          </button>
          <button
            className="episode-tooltip"
            onClick={(event) => onUpdateEpisodes(event, episode)}
          >
            <img src={Trash} className="episode-trash" />
            <div className="episode-tooltiptext"> Delete episode</div>
          </button>
        </div>
      </div>
    </div>
  );
}
