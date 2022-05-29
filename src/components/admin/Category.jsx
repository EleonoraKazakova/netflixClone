import { useEffect, useState } from "react";
import Plus from "../../images/modal/plus.svg";
import { getCollection } from "../../scripts/fireStore";
import { useModal } from "../../state/ModalProvider";
import "../../styles/admin/category.sass";
import StatusError from "../status/StatusError";
import StatusLoading from "../status/StatusLoading";
import BlockVideo from "./BlockVideo";
import FormMovie from "./FormMovie";

export default function Category({ category }) {
  const { setModal } = useModal();
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState(0);
  const path = `netflixClone/${category.id}/content`;

  useEffect(() => {
    async function loadData(path) {
      try {
        const data = await getCollection(path);
        setVideos(data);
        setStatus(1);
      } catch (error) {
        console.error("There was an error:", error);
        setStatus(2);
      }
    }
    loadData(path);
  }, []);

  const videoCards = videos.map((video) => (
    <BlockVideo
      video={video}
      category={category}
      state={[videos, setVideos]}
      key={video.id}
    />
  ));

  function openFormMovie() {
    setModal(
      <FormMovie
        categoryTitle={category.title}
        categoryID={category.id}
        setVideos={setVideos}
      />
    );
  }

  const content = (
    <>
      <p className="category-title">{category.title}</p>
      <div className="category-content">
        <button onClick={openFormMovie} className="category-add-button">
          <div className="category-add-block">
            <img src={Plus} className="category-plus" />
            Add {category.title}
          </div>
        </button>

        {videoCards}
      </div>
    </>
  );

  return (
    <section className="category-title-block">
      {status === 0 && <StatusLoading />}
      {status === 1 && content}
      {status === 2 && <StatusError />}
    </section>
  );
}
