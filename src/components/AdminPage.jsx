import { useState, useEffect } from "react";
import {
  getCollection,
  deleteDocument,
  addDocument,
} from "../scripts/fireStore";
import { Link } from "react-router-dom";
import Category from "./Category";
import { useModal } from "../state/ModalProvider";
import textToUrl from "../scripts/textToUrl";
import FormMovie from "./FormMovie";
import FormSeries from "./FormSeries";

export default function AdminPage() {
  const { setModal } = useModal();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState("");
  const [epesodeTitle, setEpesodeTitle] = useState("The  show");
  const [epesodeDescription, setEpesodeDescription] = useState(
    "It is very good movie"
  );
  const [epesode, setEpesode] = useState("1");
  const [season, setSeason] = useState("2");

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
        description: epesodeDescription,
        epesode: epesode,
        season: season,
        title: epesodeTitle,
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

  console.log("categories:", categories);
  const videoCard = categories.map((category) =>
    category.id === "series" ? (
      <button
        onClick={(event) =>
          setModal(
            <FormSeries
              title={[title, setTitle]}
              description={[description, setDescription]}
              epesodeTitle={[epesodeTitle, setEpesodeTitle]}
              epesodeDescription={[epesodeDescription, setEpesodeDescription]}
              epesode={[epesode, setEpesode]}
              season={[season, setSeason]}
              onCreate={() => onCreate(event, category.id)}
            />
          )
        }
      >
        {category.title}
      </button>
    ) : (
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
    )
  );
  console.log("categories");
  return (
    <div>
      {blockVideos}
      {videoCard}
    </div>
  );
}
