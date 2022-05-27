import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/top-ten.sass";
import { useModal } from "../../state/ModalProvider";
import ThumbNailTopTen from "./ThumbNailTopTen";

export default function SearchedVideo() {
  const params = useParams();
  const { setModal } = useModal();

  const [categories, setCategories] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  console.log("params:", params);
  console.log("categories:", categories);
  console.log("allMovies:", allMovies);

  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);

      for (const category of data) {
        const categoryData = await getCollection(
          `netflixClone/${category.id}/content`
        );
        setAllMovies((oldData) => [...oldData, ...categoryData]);
      }
    }

    loadData(path);
  }, []);

  const copyAllMovies = [...allMovies];
  const topTen = copyAllMovies
    .sort((a, b) => (a.rating > b.rating ? 1 : -1))
    .slice(0, 10);
  console.log("topTen:", topTen);
  const movieCard = topTen.map((video, index) => (
    <ThumbNailTopTen
      category={video.category}
      video={video}
      number={index + 1}
    />
  ));

  console.log("movieCard:", movieCard);

  return (
    <>
      <p className="top-ten-title">Top 10 in Sweden</p>
      <div className="top-ten-block">{movieCard}</div>
    </>
  );
}
