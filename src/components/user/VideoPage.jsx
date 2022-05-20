import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocument } from "../../scripts/fireStore";
import "../../styles/youtube.sass";

export default function VideoPage() {
  const params = useParams();

  const [movie, setMovie] = useState({});
  const path = `netflixClone/${params.category}/content/${params.videoID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setMovie(data.link);
    }
    loadData(path);
  }, []);
  /*const url = play
    ? `https://www.youtube.com/embed/${link}?autoplay=1`
    : `https://www.youtube.com/embed/${link}`;*/
  console.log("movieVP:", movie);
  return (
    <div className="youtube-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${movie}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
