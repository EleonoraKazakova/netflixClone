import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocument } from "../../scripts/fireStore";
import "../../styles/youtube.sass";
import ArrowLeft from "../../images/modal/arrow-left.svg";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function VideoPage() {
  const params = useParams();
  const navigate = useNavigate();
  console.log("params:", params);
  const [status, setStatus] = useState(0);
  const [movie, setMovie] = useState({});
  const path = `netflixClone/${params.category}/content/${params.videoID}`;
  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getDocument(path);
        setMovie(data.link);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, []);

  const content = (
    <>
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
    </>
  );

  return (
    <div className="youtube-content">
      {status === 0 && <StatusLoading />}
      {status === 1 && content}
      {status === 2 && <StatusError />}
    </div>
  );
}
