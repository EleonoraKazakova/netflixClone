import { useModal } from "../../state/ModalProvider";
import EpisodeEdit from "./EpisodeEdit";

export default function Episode({ episode, stateSeries, onUpdateEpisodes }) {
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  return (
    <div>
      {episode.title}, {episode.season}, {episode.episode}
      <button
        onClick={() =>
          setModal(
            <EpisodeEdit stateSeries={[series, setSeries]} episode={episode} />
          )
        }
      >
        Edit episode
      </button>
      <button onClick={(event) => onUpdateEpisodes(event, episode)}>
        Delete
      </button>
    </div>
  );
}
