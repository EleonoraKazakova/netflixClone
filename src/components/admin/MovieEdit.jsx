import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import InputField from "../InputField";
import createFormMovie from "../../data/createFormMovie.json";
import FormPictureEdit from "./FormPictureEdit";
import InputFieldEvent from "../InputFieldEvent";

export default function MovieEdit({
  categoryID,
  movieID,
  movieTitle,
  stateVideos,
}) {
  const [videos, setVideos] = stateVideos;
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [movie, setMovie] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const path = `netflixClone/${categoryID}/content/${movieID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setMovie(data);
      setImage(data.imgURL);
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
          `movie-${movieTitle}/${file.name}`,
          file
        );
        movie.imgURL = imgURL;
      }

      setStatus(0);

      await updateDocument(path, {
        ...movie,
      });
      setVideos(videos.map((video) => (video.id === movie.id ? movie : video)));
      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);

      setStatus(2);
    }
  }

  function onChangeTitle(event) {
    setMovie({ ...movie, title: event.target.value });
  }
  function onChangeDescription(event) {
    setMovie({ ...movie, description: event.target.value });
  }
  function onChangeLink(event) {
    setMovie({ ...movie, link: event.target.value });
  }

  return (
    <div>
      <h2>Edit {movieTitle}</h2>
      <InputFieldEvent
        setup={createFormMovie.title}
        onChange={onChangeTitle}
        value={movie.title}
      />

      <InputFieldEvent
        setup={createFormMovie.description}
        onChange={onChangeDescription}
        value={movie.description}
      />

      <InputFieldEvent
        setup={createFormMovie.link}
        onChange={onChangeLink}
        value={movie.link}
      />

      <FormPictureEdit state={[file, setFile]} stateImage={[image, setImage]} />

      <button onClick={onUpdate}>Edit video</button>
    </div>
  );
}
