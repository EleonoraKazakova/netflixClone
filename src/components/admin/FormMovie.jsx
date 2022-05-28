import { useState } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { addDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createFormMovie from "../../data/createFormMovie.json";
import "../../styles/admin/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../../state/ModalProvider";
import textToUrl from "../../scripts/textToUrl";
import EmptyImg from "../../images/empty.jpg";

export default function FormMovie({ categoryTitle, categoryID, setVideos }) {
  const { setModal } = useModal();
  const [title, setTitle] = useState("The Truman show");
  const [description, setDescription] = useState("It is very good movie");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("y4WR6HKNeyg");
  const [match, setMatch] = useState("97");
  const [year, setYear] = useState("1997");
  const [rating, setRating] = useState(10);

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
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

    if (file === null) {
      newVideo.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`netflixClone/${file.name}`, file);
      newVideo.imgURL = imgURL;
    }

    if (newVideo.title === "") return;

    await addDocument(`netflixClone/${categoryID}/content/${id}`, newVideo);

    setVideos((oldVideos) => [...oldVideos, newVideo]);
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
      <InputField setup={createFormMovie.match} state={[match, setMatch]} />
      <InputField setup={createFormMovie.year} state={[year, setYear]} />
      <InputField setup={createFormMovie.link} state={[link, setLink]} />
      <InputField setup={createFormMovie.rating} state={[rating, setRating]} />

      <FormPicture state={[file, setFile]} />
      <div className="form-button-block">
        <button onClick={onCreate} className="form-button">
          Add new video
        </button>
      </div>
    </div>
  );
}
