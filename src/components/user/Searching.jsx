import { useState, useEffect } from "react";

import "../../styles/searching.sass";
import SearchedVideo from "./SearchedVideo";
import { useNavigate } from "react-router-dom";

export default function Searching() {
  const history = useNavigate();

  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        type="text"
        id="myInput"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Search for title..."
        title="Type in a title"
      />
      <button
        onClick={() => history(`/search/${title}`)}
        className="searching-content"
      >
        Click
      </button>
    </div>
  );
}
