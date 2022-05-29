import { useState } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { addDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createForm from "../../data/createForm.json";
import "../../styles/admin/form.sass";
import FormPictureEdit from "./FormPictureEdit";
import { useModal } from "../../state/ModalProvider";
import textToUrl from "../../scripts/textToUrl";
import EmptyImg from "../../images/empty.jpg";

export default function FormMovie({ categoryTitle, categoryID, setVideos }) {
  const { setModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [match, setMatch] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");

  async function onCreate(event) {
    if (
      title === "" ||
      description === "" ||
      match === "" ||
      year === "" ||
      link === ""
    ) {
      setErrorMessage("All of the fields are required");
      return;
    }
    event.preventDefault();
    const id = textToUrl(title);

    const newVideo = {
      category: categoryTitle.toLowerCase(),
      title: title,
      id: id,
      description: description,
      imgURL: "",
      link: link,
      match: match,
      year: year,
      rating: rating,
    };

    if (categoryID === "series") {
      newVideo.seasons = [];
    }

    if (file === null) {
      newVideo.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`netflixClone/${file.name}`, file);
      newVideo.imgURL = imgURL;
    }

    if (newVideo.title === "") return;

    await addDocument(`netflixClone/${categoryID}/content/${id}`, newVideo);
    setVideos((oldVideos) => [...oldVideos, newVideo]);
    setModal(null);
  }

  return (
    <div className="form-content">
      <h2>Add {categoryTitle}</h2>

      <InputField setup={createForm.title} state={[title, setTitle]} />
      <InputField
        setup={createForm.description}
        state={[description, setDescription]}
      />
      <InputField setup={createForm.match} state={[match, setMatch]} />
      <InputField setup={createForm.year} state={[year, setYear]} />
      <InputField setup={createForm.link} state={[link, setLink]} />
      <InputField setup={createForm.rating} state={[rating, setRating]} />

      <FormPictureEdit state={[file, setFile]} image={EmptyImg} />
      <div className="form-button-block">
        {errorMessage}
        <button onClick={onCreate} className="form-button">
          Add new video
        </button>
      </div>
    </div>
  );
}
