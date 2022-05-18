import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../../scripts/fireStore";

import { useModal } from "../../state/ModalProvider";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Category({ category }) {
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

  return <></>;
}
