import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import "../../styles/series-page.sass";
import SeriesEdit from "./SeriesEdit";
import FormCreateEpisode from "./FormCreateEpisode";
import Episode from "./Episode";
import Pen from "../../images/pen.svg";

export default function SeriesPage() {
  const params = useParams();
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [series, setSeries] = useState(null);
  const [currentSeason, setCurrentSeason] = useState("1");
  const [openSeasons, setOpenSeasons] = useState(false);

  const path = `netflixClone/series/content/${params.seriesTitle}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data);
    }
    loadData(path);
  }, []);

  if (series === null) return null;

  const uniqueSeasons = [
    ...new Set(series.seasons.map((season) => season.season)),
  ];

  const season = uniqueSeasons.map((season) => (
    <div
      className="series-page-dropdown-link"
      onClick={() => setCurrentSeason(season)}
    >
      {season}
    </div>
  ));

  const episodes = series.seasons.filter(
    (season) => season.season === currentSeason
  );

  async function onUpdateEpisodes(event, episode) {
    event.preventDefault();
    const newSeries = {
      ...series,
      seasons: series.seasons.filter((el) => el.id !== episode.id),
    };
    setSeries(newSeries);

    await updateDocument(`netflixClone/series/content/${series.id}`, newSeries);
  }

  const episodeCard = episodes.map((episode) => (
    <Episode
      episode={episode}
      stateSeries={[series, setSeries]}
      onUpdateEpisodes={onUpdateEpisodes}
    />
  ));

  function edit() {
    setModal(
      <SeriesEdit seriesID={series.id} stateSeries={[series, setSeries]} />
    );
  }

  return (
    <div className="series-page-content">
      <h2> {series.title}</h2>
      <div className="series-page-block">
        <img src={series.imgURL} className="series-page-img" />
        <p className="series-page-description">{series.description}</p>

        <button onClick={edit} className="episode-tooltip">
          <img src={Pen} className="episode-pen" />
          <div className="episode-tooltiptext">Edit series</div>
        </button>
      </div>

      <h2>Seasons</h2>
      <div className="series-page-button-block">
        <button
          className="series-page-button-add"
          onClick={() =>
            setModal(<FormCreateEpisode stateSeries={[series, setSeries]} />)
          }
        >
          Add new episode
        </button>
        <button
          className="series-page-dropdown"
          onClick={() => setOpenSeasons(!openSeasons)}
        >
          Choose season
          {openSeasons && (
            <div className="series-page-dropdown-content">{season}</div>
          )}
        </button>
      </div>

      {episodeCard}
    </div>
  );
}
