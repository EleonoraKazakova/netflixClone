import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocument } from "../../scripts/fireStore";
import "../../styles/admin/form.sass";
import "../../styles/series-page.sass";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";
import SeriesPageContent from "./SeriesPageContent";

export default function SeriesPage() {
  const params = useParams();

  const [status, setStatus] = useState(0);
  const [series, setSeries] = useState(null);

  const path = `netflixClone/series/content/${params.seriesTitle}`;
  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getDocument(path);
        setSeries(data);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, []);

  if (series === null) return null;

  return (
    <section className="series-page-content">
      {status === 0 && <StatusLoading />}
      {status === 1 && <SeriesPageContent state={[series, setSeries]} />}
      {status === 2 && <StatusError />}
    </section>
  );
}
