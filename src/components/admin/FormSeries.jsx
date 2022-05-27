import { useState } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { addDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createFormSeries from "../../data/createFormSeries.json";
import "../../styles/admin/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../../state/ModalProvider";
import textToUrl from "../../scripts/textToUrl";
import EmptyImg from "../../images/empty.jpg";

export default function FormSeries({ categoryTitle, categoryID, setVideos }) {
  const { setModal } = useModal();

  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("y4WR6HKNeyg");
  const [match, setMatch] = useState("97");
  const [rating, setRating] = useState(10);

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
      link: link,
      match: match,
      rating: rating,
      seasons: [],
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
      <InputField setup={createFormSeries.match} state={[match, setMatch]} />
      <InputField setup={createFormSeries.link} state={[link, setLink]} />
      <InputField setup={createFormSeries.rating} state={[rating, setRating]} />
      <FormPicture state={[file, setFile]} />

      <div className="movie-edit-button-block">
        <button onClick={onCreate} className="movie-edit-button">
          Add new series
        </button>
      </div>
    </div>
  );
}
