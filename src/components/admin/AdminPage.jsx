import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Category from "./Category";
import "../../styles/admin/admin-page.sass";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
    }
    loadData(path);
  }, []);

  const blockVideos = categories.map((category) => (
    <Category category={category} key={category.id} />
  ));

  return <div className="admin-page-content">{blockVideos}</div>;
}
