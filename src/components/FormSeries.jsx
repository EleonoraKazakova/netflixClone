import InputField from "./InputField";
import createFormSeries from "../data/createFormSeries.json";
import "../styles/form.sass";
import FormPicture from "./FormPicture";

export default function FormSeries({
  title,
  description,
  epesodeTitle,
  epesodeDescription,
  epesode,
  season,
  link,
  file,
  onCreate,
}) {
  console.log("title:", title);
  return (
    <div className="form-content">
      <h2>Add Series</h2>
      <InputField setup={createFormSeries.title} state={title} />
      <InputField setup={createFormSeries.description} state={description} />
      <InputField setup={createFormSeries.epesodeTitle} state={epesodeTitle} />
      <InputField
        setup={createFormSeries.epesodeDescription}
        state={epesodeDescription}
      />
      <InputField setup={createFormSeries.epesode} state={epesode} />
      <InputField setup={createFormSeries.season} state={season} />
      <InputField setup={createFormSeries.season} state={link} />
      <FormPicture state={file} />
      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
