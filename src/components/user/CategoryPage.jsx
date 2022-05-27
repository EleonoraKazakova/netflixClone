import { useParams } from "react-router-dom";
import VideoThumbNail from "./VideoThumbNail";
import "../../styles/user-page.sass";
import { useEffect, useState } from "react";
import { getCollection } from "../../scripts/fireStore";

export default function CategoryPage() {
  const params = useParams();
  console.log("params:", params);
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${params.category}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, [params.category]);

  const videoCard = videos.map((video) => (
    <div className="user-category-block">
      <VideoThumbNail video={video} category={params.category} />
    </div>
  ));
  return <div className="user-page-block">{videoCard}</div>;
}
