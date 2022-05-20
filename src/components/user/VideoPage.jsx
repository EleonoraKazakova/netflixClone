import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocument } from "../../scripts/fireStore";
import "../../styles/youtube.sass";
import ArrowLeft from "../../images/modal/arrow-left.svg";

export default function VideoPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const path = `netflixClone/${params.category}/content/${params.videoID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setMovie(data.link);
    }
    loadData(path);
  }, []);

  return (
    <div className="youtube-content">
      <img
        src={ArrowLeft}
        onClick={() => navigate(-2)}
        className="youtube-button"
      />

      <div className="youtube-responsive-page">
        <iframe
          src={`https://www.youtube.com/embed/${movie}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  );
}
