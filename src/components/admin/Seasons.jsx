import { useState } from "react";
import CaretDown from "../../images/modal/caret-down.svg";
import { updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import Episode from "./Episode";
import FormCreateEpisode from "./FormCreateEpisode";

export default function Seasons({ stateSeries }) {
  const { setModal } = useModal();
  const [series, setSeries] = stateSeries;
  const [openSeasons, setOpenSeasons] = useState(false);
  const [currentSeason, setCurrentSeason] = useState("1");

  const episodes = series.seasons.filter(
    (season) => season.season === currentSeason
  );

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
      key={episode.id}
    />
  ));

  return (
    <>
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
          <img src={CaretDown} className="series-page-caretdown" />
          {openSeasons && (
            <div className="series-page-dropdown-content">{season}</div>
          )}
        </button>
      </div>

      {episodeCard}
    </>
  );
}
