import { useModal } from "../../state/ModalProvider";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Searching from "./Searching";
import UserCategory from "./UserCategory";

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

  /*const searchingBlock = categories.map((category) => (
    <Searching category={category} />
  ));*/

  function modalMessage() {
    setModal("Eleonora");
  }

  return (
    <div>
      Hello user!
      <button onClick={modalMessage}>Click</button>
      <Searching categories={categories} />
    </div>
  );
}
