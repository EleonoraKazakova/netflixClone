import footerData from "../data/footerData.json";
import "../styles/footer.sass";

export default function Footer() {
  const footerList = footerData.footer.map((data, index) => (
    <p className="footer-element" key={index}>
      {data}
    </p>
  ));

  const mediaList = footerData.media.map((data, index) => (
    <img
      src={require(`../images/social-media/${data}`)}
      className="footer-media"
      key={index}
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
