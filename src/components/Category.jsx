import { useState, useEffect } from "react";
import {
  getCollection,
  getDocument,
  deleteDocument,
} from "../scripts/fireStore";

export default function Category({ category }) {
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);
  console.log("videos:", videos);

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`netflixClone/${category.id}/content`);
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
  }

  const videoCards = videos.map((video) => (
    <div>
      {video.title}
      <button onClick={(event) => onDelete(event, video.id)}>Delete</button>
    </div>
  ));

  return <>{videoCards}</>;
}
