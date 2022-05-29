import { useState } from "react";
import createForm from "../../data/createForm.json";
import EmptyImg from "../../images/empty.jpg";
import { createFile } from "../../scripts/cloudStorage";
import { updateDocument } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import InputField from "../InputField";
import FormPictureEdit from "./FormPictureEdit";
import StatusLoading from "../status/StatusLoading";
import StatusError from "../status/StatusError";

export default function FormCreateEpisode({ stateSeries }) {
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [series, setSeries] = stateSeries;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [episode, setEpisode] = useState("");
  const [season, setSeason] = useState("");
  const [link, setLink] = useState("");

  async function onCreate(event) {
    setStatus(0);
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

    try {
      if (file === null) {
        newEpisode.imgURL = EmptyImg;
      } else {
        const imgURL = await createFile(`netflixClone/${file.name}`, file);
        newEpisode.imgURL = imgURL;
      }

      if (newEpisode.title === "") return;

      const newSeries = {
        ...series,
        seasons: [...series.seasons, newEpisode],
      };

      setSeries(newSeries);
      await updateDocument(
        `netflixClone/series/content/${series.id}`,
        newSeries
      );
      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);
      setStatus(2);
    }
  }

  return (
    <div className="form-content">
      <h2>Add new episode</h2>
      <InputField setup={createForm.season} state={[season, setSeason]} />
      <InputField setup={createForm.episode} state={[episode, setEpisode]} />

      <InputField setup={createForm.episodeTitle} state={[title, setTitle]} />
      <InputField
        setup={createForm.episodeDescription}
        state={[description, setDescription]}
      />

      <InputField setup={createForm.link} state={[link, setLink]} />
      <FormPictureEdit state={[file, setFile]} image={EmptyImg} />

      <div className="form-button-block">
        <button onClick={onCreate} className="form-button">
          Add new episode
        </button>
        {status === 0 && <StatusLoading small={true} />}
        {status === 2 && <StatusError small={true} />}
      </div>
    </div>
  );
}
