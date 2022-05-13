import InputField from "./InputField";
import createFormMovie from "../data/createFormMovie.json";
import "../styles/form.sass";
import FormPicture from "./FormPicture";

export default function FormMovie({ title, description, file, onCreate }) {
  console.log("title:", title);
  return (
    <div className="form-content">
      <h2>Add movie or documentory</h2>
      <InputField setup={createFormMovie.title} state={title} />
      <InputField setup={createFormMovie.description} state={description} />
      <FormPicture state={file} />

      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
