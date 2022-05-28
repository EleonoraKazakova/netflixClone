import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import UserCategory from "./UserCategory";
import "../../styles/user-page.sass";
import TopTen from "../user/TopTen";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";

export default function UserPage() {
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

  const videoBlock = categories.map((category, index) => (
    <div className="user-page-block" key={index}>
      <p className="user-page-title">{category.title}</p>
      <UserCategory category={category} />
    </div>
  ));

  return (
    <div className="user-page-content">
      {status === 0 && <StatusLoading />}

      <div className="user-page-img">
        <p className="user-page-maintitle">
          Fantastic Beasts and Where to Find Them
        </p>
        <p className="user-page-text">
          The adventures of writer Newt Scamander in New York's secret community
          of witches and wizards seventy years before Harry Potter reads his
          book in school.
        </p>
      </div>
      <div className="user-page-position">
        {videoBlock}
        <TopTen />
      </div>

      {status === 2 && <StatusError />}
    </div>
  );
}
