import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/serched-video.sass";
import VideoThumbNail from "./VideoThumbNail";

export default function SearchedVideo() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [searching, setSearching] = useState([]);

  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);

      for (const category of data) {
        const categoryData = await getCollection(
          `netflixClone/${category.id}/content`
        );
        setSearching((oldData) => [...oldData, ...categoryData]);
      }
    }

    loadData(path);
  }, []);

  const filteredMovies = searching.filter((el) => el.id === params.videoTitle);

  const movieCard = filteredMovies.map((video) => (
    <VideoThumbNail category={video.category} video={video} key={video.id} />
  ));

  return (
    <div className="serched-video-content">
      <h3>Results:</h3>
      {movieCard.length >= 1 ? movieCard : <p>Sorry, we did not find movies</p>}
    </div>
  );
}
