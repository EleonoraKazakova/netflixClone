import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import InputField from "../InputField";
import createFormSeries from "../../data/createFormSeries.json";
import FormPicture from "./FormPicture";
import "../../styles/series-page.sass";
import SeriesEdit from "./SeriesEdit";
import EpisodeEdit from "./EpisodeEdit";
import FormCreateEpisode from "./FormCreateEpisode";

export default function SeriesPage() {
  const params = useParams();
  const { setModal } = useModal();
  console.log("params:", params);
  const [status, setStatus] = useState(1);
  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const path = `netflixClone/series/content/${params.seriesTitle}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data);
    }
    loadData(path);
  }, []);

  if (series === null) return null;

  const episode = series.seasons.map((season) => (
    <div>
      <img src={season.imgURL} className="series-page-img" />
      Season: {season.season}, Episode: {season.episode}, {season.title},
      {season.description}
      <button
        onClick={() =>
          setModal(
            <EpisodeEdit stateSeries={[series, setSeries]} episode={season} />
          )
        }
      >
        Edit episode
      </button>
    </div>
  ));

  const season = series.seasons.map((season) => (
    <div
      className="series-page-dropdown-link"
      onClick={() => filterSeasons(season.season)}
    >
      {season.season}
    </div>
  ));
  function filterSeasons(currentSeason) {
    console.log("currentSeason:", currentSeason);
    setEpisodes(
      series.seasons.filter((season) => season.season === currentSeason)
    );
  }
  console.log("episodes:", episodes);
  const episodeCard = episodes.map((episode) => (
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
    </div>
  ));

  return (
    <div className="series-page-content">
      <h2> {series.title}</h2>
      <p>{series.description}</p>
      <img src={series.imgURL} className="series-page-img" />

      <button
        onClick={() =>
          setModal(
            <SeriesEdit
              seriesID={series.id}
              stateSeries={[series, setSeries]}
            />
          )
        }
      >
        Edit series
      </button>

      <h2>Seasons</h2>

      <div className="series-page-dropdown">
        <button>Choose season</button>
        <div className="series-page-dropdown-content">{season}</div>
      </div>

      <button
        onClick={() =>
          setModal(<FormCreateEpisode stateSeries={[series, setSeries]} />)
        }
      >
        Add new episode
      </button>
      {episodeCard}
      {/*episode*/}
    </div>
  );
}
