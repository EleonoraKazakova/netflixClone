import "../styles/youtube.sass";

export default function Youtube({ link, play }) {
  const url = play
    ? `https://www.youtube.com/embed/${link}?autoplay=1`
    : `https://www.youtube.com/embed/${link}`;

  return (
    <div className="youtube-responsive">
      <iframe
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
