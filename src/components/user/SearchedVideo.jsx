import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/serched-video.sass";
import { useModal } from "../../state/ModalProvider";
import VideoThumbNail from "./VideoThumbNail";

export default function SearchedVideo() {
  const params = useParams();
  const { setModal } = useModal();
  const [searchedVideo, setSearchedVideo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searching, setSearching] = useState([]);

  console.log("params:", params);
  console.log("categories:", categories);
  console.log("searchedVideo:", searchedVideo);

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

  const filteredMovies = searching.filter(
    (el) => el.title === params.videoTitle
  );

  const movieCard = filteredMovies.map((video) => (
    <VideoThumbNail category={video.category} video={video} />
  ));

  return (
    <div className="serched-video-content">
      Results for: {params.videoTitle}
      {movieCard.length >= 1 ? movieCard : <p>Sorry, we did not find movies</p>}
    </div>
  );
}
