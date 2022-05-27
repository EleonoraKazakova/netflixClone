import { useState } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { updateDocument } from "../../scripts/fireStore";
import InputField from "../InputField";
import createFormSeries from "../../data/createFormSeries.json";
import "../../styles/admin/form.sass";
import FormPicture from "./FormPicture";
import { useModal } from "../../state/ModalProvider";
import EmptyImg from "../../images/empty.jpg";

export default function FormCreateEpisode({ stateSeries }) {
  const { setModal } = useModal();
  const [series, setSeries] = stateSeries;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [episode, setEpisode] = useState("");
  const [season, setSeason] = useState("");
  const [link, setLink] = useState("");

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = series.seasons.length + 1;

    const newEpisode = {
      description: description,
      episode: episode,
      season: season,
      title: title,
      link: link,
      imgURL: "",
      id: id,
    };

    if (file === null) {
      newEpisode.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`netflixClone/${file.name}`, file);
      newEpisode.imgURL = imgURL;
    }

    if (newEpisode.title === "") return;

    setSeries({
      ...series,
      seasons: [...series.seasons, newEpisode],
    });

    await updateDocument(`netflixClone/series/content/${series.id}`, {
      ...series,
      seasons: [...series.seasons, newEpisode],
    });

    clearForm();
    setModal(null);
  }

  return (
    <div className="form-content">
      <h2>Add new episode</h2>
      <InputField setup={createFormSeries.season} state={[season, setSeason]} />
      <InputField
        setup={createFormSeries.episode}
        state={[episode, setEpisode]}
      />

      <InputField
        setup={createFormSeries.episodeTitle}
        state={[title, setTitle]}
      />
      <InputField
        setup={createFormSeries.episodeDescription}
        state={[description, setDescription]}
      />

      <InputField setup={createFormSeries.link} state={[link, setLink]} />
      <FormPicture state={[file, setFile]} />

      <div className="form-button-block">
        <button onClick={onCreate} className="form-button">
          Add new episode
        </button>
      </div>
    </div>
  );
}
