import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import { Link } from "react-router-dom";
import Category from "./Category";

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

  return (
    <div>
      {blockVideos}

      <button>
        <Link to="user-page">Go to user page</Link>
      </button>
    </div>
  );
}
