import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { deleteDocument, addDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createFormSeries from "../../data/createFormSeries.json";
import "../../styles/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../../state/ModalProvider";
import textToUrl from "../../scripts/textToUrl";
import EmptyImg from "../../images/empty.jpg";

export default function FormSeries({ categoryTitle, categoryID, setVideos }) {
  const { setModal } = useModal();
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("series");
  const [episodeTitle, setEpisodeTitle] = useState("The  show");
  const [episodeDescription, setEpisodeDescription] = useState(
    "It is very good episode"
  );
  const [episode, setEpisode] = useState("1");
  const [season, setSeason] = useState("2");
  const [link, setLink] = useState("y4WR6HKNeyg");

  const [addEpisode, setAddEpisode] = useState(false);

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = textToUrl(title);

    const newSeries = {
      category: categoryTitle.toLowerCase(),
      title: title,
      id: id,
      description: description,
      seasons: [
        /*{
          description: episodeDescription,
          episode: episode,
          season: season,
          title: episodeTitle,
          link: link,
          imgURL: "",
          id: 1,
        },*/
      ],
      imgURL: "",
    };

    if (file === null) {
      newSeries.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`netflixClone/${file.name}`, file);
      newSeries.imgURL = imgURL;
    }

    if (newSeries.title === "") return;

    await addDocument(`netflixClone/${categoryID}/content/${id}`, newSeries);

    setVideos((oldVideos) => [...oldVideos, newSeries]);
    clearForm();
    setModal(null);
  }

  return (
    <div className="form-content">
      <h2>Add {categoryTitle}</h2>
      <InputField setup={createFormSeries.title} state={[title, setTitle]} />
      <InputField
        setup={createFormSeries.description}
        state={[description, setDescription]}
      />
      <FormPicture state={[file, setFile]} />

      <button onClick={onCreate}>Add new series</button>
    </div>
  );
}
