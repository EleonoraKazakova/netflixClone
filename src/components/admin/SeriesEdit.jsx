import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import EmptyImg from "../../images/empty.jpg";
import uploadFiles from "../../scripts/uploadFile";
import { useModal } from "../../state/ModalProvider";
import "../../styles/form.sass";
import createFormSeries from "../../data/createFormSeries.json";
import InputFieldEvent from "../InputFieldEvent";
import FormPictureEdit from "./FormPictureEdit";

export default function SeriesEdit({ seriesID, stateSeries }) {
  const params = useParams();
  const [series, setSeries] = stateSeries;
  const { setModal } = useModal();
  const [status, setStatus] = useState(1);
  const [newSeries, setNewSeries] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const path = `netflixClone/series/content/${seriesID}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setNewSeries(data);
      setImage(data.imgURL);
    }
    loadData(path);
  }, []);

  if (newSeries === null) return null;

  async function onUpdate(event) {
    try {
      event.preventDefault();

      if (newSeries.imgURL === "") {
        newSeries.imgURL = EmptyImg;
      } else if (file !== null) {
        const imgURL = await createFile(
          `series-${newSeries.title}/${file.name}`,
          file
        );
        newSeries.imgURL = imgURL;
      }

      setStatus(0);
      await updateDocument(path, { ...newSeries });
      setSeries(series.id === newSeries.id ? newSeries : series);
      setModal(null);
    } catch (error) {
      console.error("There was an error:", error);
      setStatus(2);
    }
  }

  function onChangeTitle(event) {
    setNewSeries({ ...newSeries, title: event.target.value });
  }
  function onChangeDescription(event) {
    setNewSeries({ ...newSeries, description: event.target.value });
  }
  function onChangeLink(event) {
    setNewSeries({ ...newSeries, link: event.target.value });
  }

  return (
    <div>
      <h2>Edit {newSeries.title}</h2>

      <InputFieldEvent
        setup={createFormSeries.title}
        onChange={onChangeTitle}
        value={newSeries.title}
      />
      <InputFieldEvent
        setup={createFormSeries.description}
        onChange={onChangeDescription}
        value={newSeries.description}
      />
      <InputFieldEvent
        setup={createFormSeries.link}
        onChange={onChangeLink}
        value={newSeries.link}
      />

      <FormPictureEdit state={[file, setFile]} stateImage={[image, setImage]} />
      <button onClick={onUpdate}>Edit series</button>
    </div>
  );
}
