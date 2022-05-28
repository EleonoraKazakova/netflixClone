import "../../styles/admin/courseCreate.sass";
import "../../styles/admin/formPicture.sass";

export default function FormPictureEdit({ state, image }) {
  const [file, setFile] = state;

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
