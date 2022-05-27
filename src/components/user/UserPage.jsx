import { useModal } from "../../state/ModalProvider";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Searching from "./Searching";
import UserCategory from "./UserCategory";
import "../../styles/user-page.sass";
import TopTen from "../user/TopTen";

export default function UserPage() {
  const { setModal } = useModal();
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

  const videoBlock = categories.map((category) => (
    <div className="user-page-block">
      <p className="user-page-title">{category.title}</p>{" "}
      <UserCategory category={category} />
    </div>
  ));

  return (
    <div className="user-page-content">
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
    </div>
  );
}
