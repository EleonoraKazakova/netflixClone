import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import InputField from "../InputField";
import createFormMovie from "../../data/createFormMovie.json";
import FormPicture from "./FormPicture";

export default function MovieEdit({ categoryID, movieID, movieTitle }) {
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const path = `netflixClone/${categoryID}/content/${movieID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setMovie(data);
    }
    loadData(path);
  }, []);
  console.log("movie:", movie);

  if (movie === null) return null;

  async function onUpdate(event) {
    try {
      event.preventDefault();

      if (movie.imgURL === "") {
        movie.imgURL = EmptyImg;
      } else if (file !== null) {
        const imgURL = await createFile(
          `movie-${movieTitle}/${file.name}`,
          file
        );
        movie.imgURL = imgURL;
      }

      setStatus(0);

      await updateDocument(path, {
        ...movie,
      });

      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);

      setStatus(2);
    }
  }

  return (
    <div>
      <h2>Edit {movieTitle}</h2>
      <div>
        <label>Title</label>
        <input
          placeholder="Title"
          required
          type="text"
          value={movie.title}
          onChange={(event) =>
            setMovie({ ...movie, title: event.target.value })
          }
        />
      </div>
      <div>
        <label>Description</label>
        <input
          placeholder="description"
          type="text"
          value={movie.description}
          onChange={(event) =>
            setMovie({ ...movie, description: event.target.value })
          }
        />
      </div>
      <div>
        <label>Link</label>
        <input
          placeholder="link"
          type="text"
          value={movie.link}
          onChange={(event) => setMovie({ ...movie, link: event.target.value })}
        />
      </div>
      <FormPicture state={[file, setFile]} />

      <button onClick={onUpdate}>Edit video</button>
    </div>
  );
}
