import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../../scripts/fireStore";
import "../../styles/basic/card.sass";
import Youtube from "../Youtube";

import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function UserCategory({ category }) {
  const history = useNavigate();
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setVideos(data);
    }
    loadData(path);
  }, []);

  const videoCards = videos.map((video) => (
    <div>
      {video.title}
      <img
        src={video.imgURL}
        className="card-img"
        onClick={() =>
          setModal(
            <div>
              <Youtube link={video.link} />
              {video.title}
              {video.description}
            </div>
          )
        }
      />
    </div>
  ));

  return <div>{videoCards}</div>;
}
