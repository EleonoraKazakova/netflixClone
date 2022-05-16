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

export default function SeriesEdit({ seriesID }) {
  const params = useParams();
  const { setModal } = useModal();
  console.log("params:", params);
  const [status, setStatus] = useState(1);
  const [series, setSeries] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [episode, setEpisode] = useState("");
  const [season, setSeason] = useState("");
  const [link, setLink] = useState("");

  const path = `netflixClone/series/content/${seriesID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data);
    }
    loadData(path);
  }, []);
  console.log("series:", series);

  if (series === null) return null;

  async function onUpdate(event) {
    try {
      event.preventDefault();

      if (series.imgURL === "") {
        series.imgURL = EmptyImg;
      } else if (file !== null) {
        const imgURL = await createFile(
          `series-${series.title}/${file.name}`,
          file
        );
        series.imgURL = imgURL;
      }

      setStatus(0);

      await updateDocument(path, { ...series });

      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);

      setStatus(2);
    }
  }

  return (
    <div>
      <h2>Edit {series.title}</h2>
      <div>
        <label>Title</label>
        <input
          placeholder="Title"
          required
          type="text"
          value={series.title}
          onChange={(event) =>
            setSeries({ ...series, title: event.target.value })
          }
        />
      </div>
      <div>
        <label>Description</label>
        <input
          placeholder="description"
          type="text"
          value={series.description}
          onChange={(event) =>
            setSeries({ ...series, description: event.target.value })
          }
        />
      </div>
      <div>
        <label>Link</label>
        <input
          placeholder="link"
          type="text"
          value={series.link}
          onChange={(event) =>
            setSeries({ ...series, link: event.target.value })
          }
        />
      </div>
      <FormPicture state={[file, setFile]} />

      <button onClick={onUpdate}>Edit series</button>
    </div>
  );
}
