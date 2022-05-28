import { useState } from "react";
import VideoBlock from "./VideoBlock";
import CaretDown from "../../images/modal/caret-down.svg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../state/ModalProvider";

export default function BlockModalSeries({ video, category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [currentSeason, setCurrentSeason] = useState("1");
  const [openSeasons, setOpenSeasons] = useState(false);
  const uniqueSeasons = [...new Set(video.seasons.map((vid) => vid.season))];

  const season = uniqueSeasons.map((season) => (
    <div
      className="series-page-dropdown-link"
      onClick={() => setCurrentSeason(season)}
      key={season.id}
    >
      {season}
    </div>
  ));

  const episodes = video.seasons.filter(
    (season) => season.season === currentSeason
  );

  function openEpisode(event, season) {
    event.preventDefault();
    history(`/${category.id}/${video.id}/${season.id}`);
    setModal(null);
  }
  return (
    <>
      <VideoBlock
        link={video.link}
        titleID={video.id}
        category={category.id}
        title={video.title}
      />
      <div className="user-category-match-year">
        <p className="user-category-match">{video.match}% Match</p>
        {video.year}
      </div>

      <p className="user-category-match-year"> {video.description}</p>

      <div className="user-category-seasons">
        <h2>Episodes</h2>

        <div className="series-page-dropdown">
          <div
            onClick={() => setOpenSeasons(!openSeasons)}
            className="series-page-seasons"
          >
            <p>Choose season</p>
            <img src={CaretDown} className="series-page-caretdown" />
          </div>

          {openSeasons && (
            <div className="series-page-dropdown-content">{season}</div>
          )}
        </div>
      </div>

      {episodes.length >= 1 ? (
        episodes.map((season) => (
          <div
            className="user-category-series"
            onClick={(event) => openEpisode(event, season)}
            key={season.id}
          >
            <img src={season.imgURL} className="user-category-img" />
            <div className="user-category-series-content">
              <div className="user-category-number">
                <p>Season: {season.season}</p>
                <p>Episode: {season.episode}</p>
              </div>
              <p className="user-category-title">{season.title}</p>
              <p>{season.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="user-category-series">Content coming soon</p>
      )}
    </>
  );
}
