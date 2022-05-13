import InputField from "./InputField";
import createForm from "../data/createForm.json";
import { useModal } from "../state/ModalProvider";

export default function FormMovie({ title, description, onCreate }) {
  const { setModal } = useModal();
  return (
    <div>
      <InputField setup={createForm.title} state={title} />
      <InputField setup={createForm.description} state={description} />
      <button onClick={onCreate}>Add new video</button>
    </div>
  );
}
