import { useEffect, useState } from "react";
import { getCollection } from "../../scripts/fireStore";
import "../../styles/basic/card.sass";
import "../../styles/series-page.sass";
import "../../styles/user-category.sass";
import VideoThumbNail from "./VideoThumbNail";

export default function UserCategory({ category }) {
  const [videos, setVideos] = useState([]);

  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  const videoCards = videos.map((video, index) => (
    <VideoThumbNail video={video} category={category.id} key={index} />
  ));

  return <section className="user-category-block">{videoCards}</section>;
}
