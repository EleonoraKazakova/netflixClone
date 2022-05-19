import "../styles/youtube.sass";

export default function Youtube({ link }) {
  return (
    <div className="youtube-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${link}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
