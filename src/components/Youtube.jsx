import "../styles/youtube.sass";

export default function Youtube({ link, title }) {
  const url = `https://www.youtube.com/embed/${link}`;

  return (
    <div>
      <p className="youtube-title">{title}</p>
      <div className="youtube-responsive">
        <iframe
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  );
}
