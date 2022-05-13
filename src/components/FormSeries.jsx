import InputField from "./InputField";
import createFormSeries from "../data/createFormSeries.json";

export default function FormSeries({
  title,
  description,
  epesodeTitle,
  epesodeDescription,
  epesode,
  season,
  onCreate,
}) {
  console.log("title:", title);
  return (
    <div>
      <InputField setup={createFormSeries.title} state={title} />
      <InputField setup={createFormSeries.description} state={description} />
      <InputField setup={createFormSeries.epesodeTitle} state={epesodeTitle} />
      <InputField
        setup={createFormSeries.epesodeDescription}
        state={epesodeDescription}
      />
      <InputField setup={createFormSeries.epesode} state={epesode} />
      <InputField setup={createFormSeries.season} state={season} />
      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
