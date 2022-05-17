import EmptyImg from "../../images/empty.jpg";
import "../../styles/formPicture.sass";
import "../../styles/courseCreate.sass";

export default function FormPicture({ state, stateImage }) {
  const [file, setFile] = state;
  const [image, setImage] = stateImage;

  return (
    <div>
      <div className="courseCreate-buttons-block">
        <label
          className="courseCreate-button-small"
          htmlFor="formPicture-upload"
        >
          Choose image
        </label>
        <button
          className="courseCreate-button-small "
          onClick={() => setFile(null)}
        >
          Delete picture
        </button>
      </div>
      <img
        src={file !== null ? URL.createObjectURL(file) : image}
        className="courseCreate-img"
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="formPicture-upload"
        className="formpicture-input"
        onChange={(event) => setFile(event.target.files[0])}
      />
    </div>
  );
}
