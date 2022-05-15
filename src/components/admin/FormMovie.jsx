import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { deleteDocument, addDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createFormMovie from "../../data/createFormMovie.json";
import "../../styles/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../../state/ModalProvider";
import textToUrl from "../../scripts/textToUrl";
import EmptyImg from "../../images/empty.jpg";

export default function FormMovie({ categoryTitle, categoryID }) {
  const { setModal } = useModal();
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("y4WR6HKNeyg");

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = textToUrl(title);

    const newVideo = {
      title: title,
      id: id,
      description: description,
      imgURL: "",
      link: link,
    };

    if (file === null) {
      newVideo.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`netflixClone/${file.name}`, file);
      newVideo.imgURL = imgURL;
    }

    if (newVideo.title === "") return;

    await addDocument(`netflixClone/${categoryID}/content/${id}`, newVideo);

    clearForm();
    setModal(null);
  }

  return (
    <div className="form-content">
      <h2>Add {categoryTitle}</h2>
      <InputField setup={createFormMovie.title} state={[title, setTitle]} />
      <InputField
        setup={createFormMovie.description}
        state={[description, setDescription]}
      />
      <InputField setup={createFormMovie.link} state={[link, setLink]} />
      <FormPicture state={[file, setFile]} />

      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
