import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import "../../styles/series-page.sass";
import SeriesEdit from "./SeriesEdit";
import FormCreateEpisode from "./FormCreateEpisode";
import Episode from "./Episode";

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
      <p>{series.description}</p>
      <img src={series.imgURL} className="series-page-img" />

      <button onClick={edit}>Edit series</button>

      <h2>Seasons</h2>

      <div className="series-page-dropdown">
        <button onClick={() => setOpenSeasons(!openSeasons)}>
          Choose season
        </button>
        {openSeasons && (
          <div className="series-page-dropdown-content">{season}</div>
        )}
      </div>

      <button
        onClick={() =>
          setModal(<FormCreateEpisode stateSeries={[series, setSeries]} />)
        }
      >
        Add new episode
      </button>
      {episodeCard}
    </div>
  );
}
