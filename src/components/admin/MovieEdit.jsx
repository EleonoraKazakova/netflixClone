import { useEffect, useState } from "react";
import createForm from "../../data/createForm.json";
import EmptyImg from "../../images/empty.jpg";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import "../../styles/admin/movie-edit.sass";
import InputField from "../InputField";
import FormPictureEdit from "./FormPictureEdit";

export default function MovieEdit({ categoryID, movieID, setVideo }) {
  const { setModal } = useModal();
  const [movie, setMovie] = useState(null);
  const [file, setFile] = useState(null);

  const path = `netflixClone/${categoryID}/content/${movieID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setMovie(data);
    }
    loadData(path);
  }, []);

  if (movie === null) return null;

  async function onUpdate(event) {
    try {
      event.preventDefault();

      if (movie.imgURL === "") {
        movie.imgURL = EmptyImg;
      } else if (file !== null) {
        const imgURL = await createFile(
          `${categoryID}-${movieID}/${file.name}`,
          file
        );
        movie.imgURL = imgURL;
      }

      await updateDocument(path, { ...movie });

      setVideo(movie);
      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);
    }
  }

  function onChange(value, field) {
    setMovie({ ...movie, [field]: value });
  }

  return (
    <div className="movie-edit">
      <h2>Edit {movie.title}</h2>
      <InputField
        setup={createForm.title}
        state={[movie.title, (value) => onChange(value, "title")]}
      />

      <InputField
        setup={createForm.description}
        state={[movie.description, (value) => onChange(value, "description")]}
      />
      <InputField
        setup={createForm.match}
        state={[movie.match, (value) => onChange(value, "match")]}
      />

      <InputField
        setup={createForm.year}
        state={[movie.year, (value) => onChange(value, "year")]}
      />

      <InputField
        setup={createForm.link}
        state={[movie.link, (value) => onChange(value, "link")]}
      />

      <InputField
        setup={createForm.rating}
        state={[movie.rating, (value) => onChange(value, "rating")]}
      />

      <FormPictureEdit state={[file, setFile]} image={movie.imgURL} />
      <div className="movie-edit-button-block">
        <button onClick={onUpdate} className="movie-edit-button">
          Edit video
        </button>
      </div>
    </div>
  );
}
