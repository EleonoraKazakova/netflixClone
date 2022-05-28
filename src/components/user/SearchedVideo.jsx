import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/serched-video.sass";
import VideoThumbNail from "./VideoThumbNail";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function SearchedVideo() {
  const params = useParams();
  const [searching, setSearching] = useState([]);
  const [status, setStatus] = useState(0);

  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getCollection(path);

        for (const category of data) {
          const categoryData = await getCollection(
            `netflixClone/${category.id}/content`
          );
          setSearching((oldData) => [...oldData, ...categoryData]);
        }
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }

    loadData(path);
  }, []);

  const filteredMovies = searching.filter((el) =>
    el.id.includes(params.videoTitle)
  );

  const movieCard = filteredMovies.map((video) => (
    <VideoThumbNail category={video.category} video={video} key={video.id} />
  ));

  const content = (
    <>
      <h3>Results:</h3>
      <div className="serched-video-block">
        {movieCard.length >= 1 ? (
          movieCard
        ) : (
          <p>Sorry, we did not find movies</p>
        )}
      </div>
    </>
  );

  return (
    <div className="serched-video-content">
      {status == 0 && <StatusLoading />}
      {status == 0 && content}
      {status == 2 && <StatusError />}
    </div>
  );
}
