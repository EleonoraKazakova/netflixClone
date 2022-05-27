import { useState } from "react";
import textToUrl from "../../scripts/textToUrl";
import "../../styles/searching.sass";
import { useNavigate } from "react-router-dom";

export default function Searching() {
  const history = useNavigate();

  const [title, setTitle] = useState("");

  function search(event) {
    event.preventDefault();
    history(`/search/${textToUrl(title)}`);
  }

  return (
    <form onSubmit={search}>
      <input
        type="search"
        id="myInput"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Search for title..."
        title="Type in a title"
        className="searching-content"
      />
    </form>
  );
}
