import { useState } from "react";
import createForm from "../../data/createForm.json";
import EmptyImg from "../../images/empty.jpg";
import { createFile } from "../../scripts/cloudStorage";
import { updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import "../../styles/admin/movie-edit.sass";
import InputField from "../InputField";
import FormPictureEdit from "./FormPictureEdit";

export default function EpisodeEdit({ stateSeries, episode }) {
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  const [file, setFile] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(episode);

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

    const updatedSeries = {
      ...series,
      seasons: series.seasons.map((el) =>
        el.id === currentEpisode.id ? currentEpisode : el
      ),
    };

    setSeries(updatedSeries);

    await updateDocument(
      `netflixClone/series/content/${series.id}`,
      updatedSeries
    );

    setModal(null);
  }

  function onChange(value, field) {
    setCurrentEpisode({ ...currentEpisode, [field]: value });
  }

  return (
    <div className="movie-edit">
      <h2>Edit {episode.title}</h2>
      <InputField
        setup={createForm.episodeTitle}
        state={[currentEpisode.title, (value) => onChange(value, "title")]}
      />
      <InputField
        setup={createForm.episodeDescription}
        state={[
          currentEpisode.description,
          (value) => onChange(value, "description"),
        ]}
      />
      <InputField
        setup={createForm.episodeLink}
        state={[currentEpisode.link, (value) => onChange(value, "link")]}
      />
      <FormPictureEdit state={[file, setFile]} image={currentEpisode.imgURL} />

      <div className="movie-edit-button-block">
        <button onClick={onUpdate} className="movie-edit-button">
          Edit episode
        </button>
      </div>
    </div>
  );
}
