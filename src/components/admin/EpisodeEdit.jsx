import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import InputField from "../InputField";
import createFormSeries from "../../data/createFormSeries.json";
import FormPicture from "./FormPicture";

export default function EpisodeEdit({ stateSeries, episode }) {
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [file, setFile] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(episode);

  console.log("series:", series);

  if (series === null) return null;

  async function onUpdate(event) {
    try {
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

      setStatus(0);

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
    } catch (error) {
      console.error("There was an error:", error);

      setStatus(2);
    }
  }

  return (
    <div>
      <h2>Edit {episode.title}</h2>
      <div>
        <label>Title of the episode</label>
        <input
          placeholder="Title"
          required
          type="text"
          value={currentEpisode.title}
          onChange={(event) =>
            setCurrentEpisode({ ...currentEpisode, title: event.target.value })
          }
        />
      </div>
      <div>
        <label>Description of the episode</label>
        <input
          placeholder="description"
          type="text"
          value={currentEpisode.description}
          onChange={(event) =>
            setCurrentEpisode({
              ...currentEpisode,
              description: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Link of the episode</label>
        <input
          placeholder="link"
          type="text"
          value={series.link}
          onChange={(event) =>
            setCurrentEpisode({ ...currentEpisode, link: event.target.value })
          }
        />
      </div>
      <FormPicture state={[file, setFile]} />
      <button onClick={onUpdate}>Edit episode</button>
    </div>
  );
}
