import footerData from "../data/footerData.json";
import "../styles/footer.sass";

export default function Footer({ light }) {
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

  const mediaListDark = footerData.mediaDark.map((data, index) => (
    <img
      src={require(`../images/social-media/${data}`)}
      className="footer-media"
      key={index}
    />
  ));

  return (
    <footer className={light ? "footer-content-light" : "footer-content"}>
      <div className="footer-media-list">
        <div className="footer-media-block">
          {light ? mediaListDark : mediaList}
        </div>
        <div className="footer-block">{footerList}</div>
      </div>
    </footer>
  );
}
