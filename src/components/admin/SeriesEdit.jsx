import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import createFormSeries from "../../data/createFormSeries.json";
import FormPicture from "./FormPicture";
import InputFieldEvent from "../InputFieldEvent";

export default function SeriesEdit({ seriesID }) {
  const params = useParams();
  const { setModal } = useModal();
  console.log("params:", params);
  const [status, setStatus] = useState(1);
  const [series, setSeries] = useState(null);
  const [file, setFile] = useState(null);

  const path = `netflixClone/series/content/${seriesID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data);
    }
    loadData(path);
  }, []);

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

  function onChangeTitle(event) {
    setSeries({ ...series, title: event.target.value });
  }
  function onChangeDescription(event) {
    setSeries({ ...series, description: event.target.value });
  }
  function onChangeLink(event) {
    setSeries({ ...series, link: event.target.value });
  }

  return (
    <div>
      <h2>Edit {series.title}</h2>

      <InputFieldEvent
        setup={createFormSeries.title}
        onChange={onChangeTitle}
        value={series.title}
      />
      <InputFieldEvent
        setup={createFormSeries.description}
        onChange={onChangeDescription}
        value={series.description}
      />
      <InputFieldEvent
        setup={createFormSeries.link}
        onChange={onChangeLink}
        value={series.link}
      />

      <FormPicture state={[file, setFile]} />
      <button onClick={onUpdate}>Edit series</button>
    </div>
  );
}
