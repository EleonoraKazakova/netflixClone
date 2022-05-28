import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Category from "./Category";
import "../../styles/admin/admin-page.sass";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(0);
  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getCollection(path);
        setCategories(data);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, []);

  const blockVideos = categories.map((category) => (
    <Category category={category} key={category.id} />
  ));

  return (
    <div className="admin-page-content">
      {status === 0 && <StatusLoading />}
      {status === 1 && blockVideos}
      {status === 2 && <StatusError />}
    </div>
  );
}
