import InputField from "./InputField";
import createFormMovie from "../data/createFormMovie.json";

export default function FormMovie({ title, description, onCreate }) {
  console.log("title:", title);
  return (
    <div>
      <InputField setup={createFormMovie.title} state={title} />
      <InputField setup={createFormMovie.description} state={description} />

      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
