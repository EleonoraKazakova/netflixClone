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
import "../../styles/series-page.sass";
import SeriesEdit from "./SeriesEdit";
import EpisodeEdit from "./EpisodeEdit";

export default function SeriesPage() {
  const params = useParams();
  const { setModal } = useModal();
  console.log("params:", params);
  const [status, setStatus] = useState(1);
  const [series, setSeries] = useState(null);

  const path = `netflixClone/series/content/${params.seriesTitle}`;
  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setSeries(data);
    }
    loadData(path);
  }, []);
  console.log("series:", series);

  if (series === null) return null;

  const episode = series.seasons.map((season) => (
    <div>
      Season: {season.season}, Episode: {season.episode}, {season.title},{" "}
      {season.description}
      <button
        onClick={() =>
          setModal(
            <EpisodeEdit stateSeries={[series, setSeries]} episode={season} />
          )
        }
      >
        Edit episode
      </button>
    </div>
  ));

  return (
    <div className="series-page-content">
      <h2> {series.title}</h2>
      <p>{series.description}</p>
      <img src={series.imgURL} className="series-page-img" />

      <button onClick={() => setModal(<SeriesEdit seriesID={series.id} />)}>
        Edit series
      </button>

      <h2>Seasons</h2>
      <button>Add new episode</button>
      {episode}
    </div>
  );
}
