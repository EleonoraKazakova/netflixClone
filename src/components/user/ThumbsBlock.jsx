import { useState } from "react";
import ThumbsUp from "../../images/modal/thumbs-up.svg";
import ThumbsDown from "../../images/modal/thumbs-down.svg";
import ThumbsUpActive from "../../images/modal/thumbs-up-active.svg";
import ThumbsDownActive from "../../images/modal/thumbs-down-active.svg";
import "../../styles/user-category.sass";
import "../../styles/thumbsblock.sass";

export default function ThumbsBlock() {
  const [openThumb, setOpenThumb] = useState(false);
  const [openThumbUp, setOpenThumbUp] = useState(false);
  const [openThumbDown, setOpenThumbDown] = useState(false);

  function changeThumbsUp() {
    setOpenThumbUp(!openThumbUp);
    setOpenThumbDown(false);
  }

  function changeThumbsDown() {
    setOpenThumbDown(!openThumbDown);
    setOpenThumbUp(false);
  }

  return (
    <div className="thumbsblock-block">
      {/* <img
        src={ThumbsUp}
        className="user-category-icon"
        onMouseOver={() => setOpenThumb(true)}
        onMouseOut={() => setOpenThumb(false)}
  />*/}
      {openThumb ? (
        <div>
          <img
            src={openThumbUp ? ThumbsUpActive : ThumbsUp}
            className="user-category-icon"
            onClick={changeThumbsUp}
          />
          <img
            src={openThumbDown ? ThumbsDownActive : ThumbsDown}
            className="user-category-icon"
            onClick={changeThumbsDown}
          />
        </div>
      ) : (
        <img
          src={ThumbsUp}
          className="user-category-icon"
          onClick={() => setOpenThumb(!openThumb)}
        />
      )}
    </div>
  );
}
