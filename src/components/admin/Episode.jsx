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
      {episode.title}, {episode.season}, {episode.episode}
      <button
        onClick={() =>
          setModal(
            <EpisodeEdit stateSeries={[series, setSeries]} episode={episode} />
          )
        }
      >
        Edit episode
        <img src={Pen} className="episode-pen" />
      </button>
      <button onClick={(event) => onUpdateEpisodes(event, episode)}>
        Delete
        <img src={Trash} className="episode-trash" />
      </button>
    </div>
  );
}
