import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/serched-video.sass";

export default function SearchedVideo() {
  const params = useParams();
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

  console.log("filteredMovies:", filteredMovies);

  return (
    <div className="serched-video-content">
      {params.videoTitle}
      {filteredMovies.map((el) => (
        <img src={el.imgURL} className="serched-video-img" />
      ))}
    </div>
  );
}
