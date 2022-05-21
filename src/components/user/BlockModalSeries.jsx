import { useState } from "react";
import VideoBlock from "./VideoBlock";
import CaretDown from "../../images/modal/caret-down.svg";

export default function BlockModalSeries({ video, category }) {
  const [currentSeason, setCurrentSeason] = useState("1");

  const uniqueSeasons = [...new Set(video.seasons.map((vid) => vid.season))];

  const season = uniqueSeasons.map((season) => (
    <div
      className="series-page-dropdown-link"
      onClick={() => setCurrentSeason(season)}
    >
      {season}
    </div>
  ));

  const episodes = video.seasons.filter(
    (season) => season.season === currentSeason
  );
  console.log("episodes:", episodes);
  return (
    <div>
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
          <p>Choose season</p>
          <img src={CaretDown} className="series-page-caretdown" />
          <div className="series-page-dropdown-content">{season}</div>
        </div>
      </div>

      {episodes.map((season) => (
        <div className="user-category-series">
          <img src={season.imgURL} className="user-category-img" />
          {season.episode}
          {season.title}
          {season.description}
        </div>
      ))}
    </div>
  );
}
