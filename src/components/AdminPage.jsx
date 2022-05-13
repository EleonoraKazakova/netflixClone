import { useState, useEffect } from "react";
import {
  getCollection,
  deleteDocument,
  addDocument,
} from "../scripts/fireStore";
import { Link } from "react-router-dom";
import Category from "./Category";
import { useModal } from "../state/ModalProvider";
import createForm from "../data/createForm.json";
import textToUrl from "../scripts/textToUrl";
import FormMovie from "./FormMovie";

export default function AdminPage() {
  const { setModal } = useModal();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState("");

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

  function clearForm() {
    setTitle("");
    setDescription("");
    // setFile(null);
  }

  async function onCreate(event, category) {
    event.preventDefault();
    const newType = title.toLowerCase();

    const id = textToUrl(title);

    const newVideo = {
      title: title,
      id: id,
      description: description,
      imgURL: "",
    };

    const newSeries = {
      title: title,
      id: id,
      description: description,
      seasons: {
        description: "text, text, text",
        epesode: "1",
        season: "1",
        title: "A cat",
      },
      imgURL: "",
    };

    if (category === "series") {
      await addDocument(`netflixClone/${category}/content/${id}`, newSeries);
    } else {
      await addDocument(`netflixClone/${category}/content/${id}`, newVideo);
    }

    clearForm();
    setModal(null);
  }
  const videoCard = categories.map((category) => (
    <button
      onClick={(event) =>
        setModal(
          <FormMovie
            title={[title, setTitle]}
            description={[description, setDescription]}
            onCreate={() => onCreate(event, category.id)}
          />
        )
      }
    >
      {category.title}
    </button>
  ));
  console.log("categories");
  return (
    <div>
      {blockVideos}
      {videoCard}
    </div>
  );
}
