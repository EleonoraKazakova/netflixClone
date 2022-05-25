import "../../styles/admin/form.sass";
import { createFile } from "../../scripts/cloudStorage";
import { updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import { useState } from "react";
import createFormSeries from "../../data/createFormSeries.json";
import EmptyImg from "../../images/empty.jpg";
import FormPictureEdit from "./FormPictureEdit";
import InputFieldEvent from "../InputFieldEvent";
import "../../styles/admin/movie-edit.sass";

export default function EpisodeEdit({ stateSeries, episode }) {
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  const [file, setFile] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(episode);
  const [image, setImage] = useState(currentEpisode.imgURL);

  if (series === null) return null;

  async function onUpdate(event) {
    event.preventDefault();

    if (currentEpisode.imgURL === "") {
      currentEpisode.imgURL = EmptyImg;
    } else if (file !== null) {
      const imgURL = await createFile(
        `series-${series.title}/${file.name}`,
        file
      );
      currentEpisode.imgURL = imgURL;
    }

    setSeries({
      ...series,
      seasons: series.seasons.map((el) =>
        el.id === currentEpisode.id ? currentEpisode : el
      ),
    });

    await updateDocument(`netflixClone/series/content/${series.id}`, {
      ...series,
    });

    setModal(null);
  }

  function onChangeTitle(event) {
    setCurrentEpisode({ ...currentEpisode, title: event.target.value });
  }
  function onChangeDescription(event) {
    setCurrentEpisode({ ...currentEpisode, description: event.target.value });
  }

  function onChangeLink(event) {
    setCurrentEpisode({ ...currentEpisode, link: event.target.value });
  }

  return (
    <div className="movie-edit">
      <h2>Edit {episode.title}</h2>
      <InputFieldEvent
        setup={createFormSeries.episodeTitle}
        onChange={onChangeTitle}
        value={currentEpisode.title}
      />
      <InputFieldEvent
        setup={createFormSeries.episodeDescription}
        onChange={onChangeDescription}
        value={currentEpisode.description}
      />
      <InputFieldEvent
        setup={createFormSeries.episodeLink}
        onChange={onChangeLink}
        value={currentEpisode.link}
      />
      <FormPictureEdit state={[file, setFile]} stateImage={[image, setImage]} />

      <div className="movie-edit-button-block">
        <button onClick={onUpdate} className="movie-edit-button">
          Edit episode
        </button>
      </div>
    </div>
  );
}
