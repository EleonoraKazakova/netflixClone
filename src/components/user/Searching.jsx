import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";

export default function Searching({ categories }) {
  const [searching, setSearching] = useState([]);
  const [title, setTitle] = useState("");
  const [searchedVideo, setSearchedVideo] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setSearching((oldData) => [...oldData, ...data]);
    }
    for (const category of categories) {
      loadData(`netflixClone/${category.id}/content`);
    }
  }, [categories]);

  console.log("searching:", searching);
  console.log("searchedVideo:", searchedVideo);

  function search() {
    setSearchedVideo(searching.filter((el) => el.title === title));
  }

  return (
    <div>
      <input
        type="text"
        id="myInput"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Search for names.."
        title="Type in a title"
      />
      <button onClick={search}>Click</button>
      {searchedVideo.map((el) => el.title)}
    </div>
  );
}
