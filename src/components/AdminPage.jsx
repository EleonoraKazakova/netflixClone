import { useState, useEffect } from "react";
import {
  getCollection,
  deleteDocument,
  addDocument,
} from "../scripts/fireStore";
import { Link } from "react-router-dom";
import Category from "./Category";
import { useModal } from "../state/ModalProvider";
import FormMovie from "./FormMovie";
import FormSeries from "./FormSeries";
import MovieEdit from "./MovieEdit";

export default function AdminPage() {
  const { setModal } = useModal();
  const [categories, setCategories] = useState([]);

  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
    }
    loadData(path);
  }, []);

  const blockVideos = categories.map((category) => (
    <Category category={category} />
  ));

  console.log("categories:", categories);
  const videoCard = categories.map((category) =>
    category.id === "series" ? (
      <button
        onClick={() =>
          setModal(
            <FormSeries
              categoryTitle={category.title}
              categoryID={category.id}
            />
          )
        }
      >
        Add {category.title}
      </button>
    ) : (
      <button
        onClick={() =>
          setModal(
            <FormMovie
              categoryTitle={category.title}
              categoryID={category.id}
            />
          )
        }
      >
        Add {category.title}
      </button>
    )
  );

  return (
    <div>
      {blockVideos}
      {videoCard}
    </div>
  );
}
