import { useNavigate } from "react-router-dom";
import Pen from "../../images/pen.svg";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/form.sass";
import "../../styles/series-page.sass";
import MovieEdit from "./MovieEdit";
import Seasons from "./Seasons";

export default function SeriesPageContent({ state }) {
  const [series, setSeries] = state;
  const { setModal } = useModal();
  const navigate = useNavigate();
  function edit() {
    setModal(
      <MovieEdit categoryID="series" movieID={series.id} setVideo={setSeries} />
    );
  }

  return (
    <>
      <h2> {series.title}</h2>
      <div className="series-page-block">
        <img src={series.imgURL} className="series-page-img" />
        <p className="series-page-description">{series.description}</p>
        <div>
          <button onClick={edit} className="episode-tooltip-series">
            <img src={Pen} className="episode-pen" />
            <div className="episode-tooltiptext-series">Edit series</div>
          </button>
        </div>
      </div>

      <Seasons stateSeries={[series, setSeries]} />

      <div className="series-page-button-goback">
        <div className="series-page-button" onClick={() => navigate(-1)}>
          Go back
        </div>
      </div>
    </>
  );
}
