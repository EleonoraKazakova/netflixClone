import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import { Link } from "react-router-dom";
import Category from "./Category";
import "../../styles/admin/admin-page.sass";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  console.log("categories:", categories);
  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
    }
    loadData(path);
  }, []);

  const blockVideos = categories.map((category) => (
    <Category category={category} />
  ));

  return <div className="admin-page-content">{blockVideos}</div>;
}
