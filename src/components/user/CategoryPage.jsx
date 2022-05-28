import { useParams } from "react-router-dom";
import VideoThumbNail from "./VideoThumbNail";
import "../../styles/user-page.sass";
import "../../styles/category-page.sass";
import { useEffect, useState } from "react";
import { getCollection } from "../../scripts/fireStore";
import heroData from "../../data/heroData.json";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function CategoryPage() {
  const params = useParams();
  const [status, setStatus] = useState(0);
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${params.category}/content`;

  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getCollection(path);
        setVideos(data);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, [params.category]);

  const videoCard = videos.map((video) => (
    <div className="category-page-block" key={video.id}>
      <VideoThumbNail video={video} category={params.category} />
    </div>
  ));

  const content = (
    <>
      <div className={`category-page-img category-page-${params.category}`}>
        <p className="category-page-maintitle">
          {heroData[params.category].title}
        </p>
        <p className="category-page-text">
          {heroData[params.category].description}
        </p>
      </div>
      <div className="category-page-position">{videoCard}</div>
    </>
  );

  return (
    <div className="category-page-content">
      {status === 0 && <StatusLoading />}
      {status === 1 && content}
      {status && <StatusError />}
    </div>
  );
}
