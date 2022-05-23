import { useModal } from "../../state/ModalProvider";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Searching from "./Searching";
import UserCategory from "./UserCategory";
import "../../styles/user-page.sass";

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
    <UserCategory category={category} />
  ));

  return (
    <div className="user-page-content">
      Hello user!
      <Searching categories={categories} />
      {videoBlock}
    </div>
  );
}
