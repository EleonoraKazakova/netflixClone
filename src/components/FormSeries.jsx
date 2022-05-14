import { useState, useEffect } from "react";
import { createFile } from "../scripts/cloudStorage";
import { deleteDocument, addDocument } from "../scripts/fireStore";
import InputField from "./InputField";
import createFormSeries from "../data/createFormSeries.json";
import "../styles/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../state/ModalProvider";
import textToUrl from "../scripts/textToUrl";
import EmptyImg from "../images/empty.jpg";

export default function FormSeries({ categoryTitle, categoryID }) {
  const { setModal } = useModal();
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState(null);
  const [epesodeTitle, setEpesodeTitle] = useState("The  show");
  const [epesodeDescription, setEpesodeDescription] = useState(
    "It is very good epesode"
  );
  const [epesode, setEpesode] = useState("1");
  const [season, setSeason] = useState("2");
  const [link, setLink] = useState("y4WR6HKNeyg");

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = textToUrl(title);

    const newSeries = {
      title: title,
      id: id,
      description: description,
      seasons: {
        description: epesodeDescription,
        epesode: epesode,
        season: season,
        title: epesodeTitle,
        link: link,
      },
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
      <InputField
        setup={createFormSeries.epesodeTitle}
        state={[epesodeTitle, setEpesodeTitle]}
      />
      <InputField
        setup={createFormSeries.epesodeDescription}
        state={[epesodeDescription, setEpesodeDescription]}
      />
      <InputField
        setup={createFormSeries.epesode}
        state={[epesode, setEpesode]}
      />
      <InputField setup={createFormSeries.season} state={[season, setSeason]} />
      <InputField setup={createFormSeries.season} state={[link, setLink]} />
      <FormPicture state={[file, setFile]} />
      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
