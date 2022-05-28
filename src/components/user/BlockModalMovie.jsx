import VideoBlock from "./VideoBlock";

export default function BlockModalMovie({ video, category }) {
  return (
    <div>
      <VideoBlock
        link={video.link}
        titleID={video.id}
        category={category}
        title={video.title}
      />
      <div className="user-category-match-year">
        <p className="user-category-match">{video.match}% Match</p>
        {video.year}
      </div>

      <p className="user-category-match-year"> {video.description}</p>
    </div>
  );
}
