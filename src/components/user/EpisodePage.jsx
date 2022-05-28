import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "../../images/modal/arrow-left.svg";
import { getDocument } from "../../scripts/fireStore";
import "../../styles/youtube.sass";

export default function EpisodePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [series, setSeries] = useState([]);
  const path = `netflixClone/${params.category}/content/${params.seriesID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data.seasons);
    }
    loadData(path);
  }, []);

  const episode = series.find(
    (episode) => episode.id === Number(params.episodeID)
  );

  return (
    <div className="youtube-content">
      <img
        src={ArrowLeft}
        onClick={() => navigate(-2)}
        className="youtube-button"
      />

      <div className="youtube-responsive-page">
        {episode ? (
          <iframe
            src={`https://www.youtube.com/embed/${episode.link}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        ) : null}
      </div>
    </div>
  );
}
