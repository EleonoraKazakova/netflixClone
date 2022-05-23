import footerData from "../data/footerData.json";
import "../styles/footer.sass";

export default function Footer() {
  const footerList = footerData.footer.map((data) => (
    <p className="footer-element">{data}</p>
  ));

  const mediaList = footerData.media.map((data) => (
    <img
      src={require(`../images/social-media/${data}`)}
      className="footer-media"
    />
  ));

  return (
    <div className="footer-content">
      <div className="footer-media-list">
        <div className="footer-media-block">{mediaList}</div>
        <div className="footer-block">{footerList}</div>
      </div>
    </div>
  );
}
