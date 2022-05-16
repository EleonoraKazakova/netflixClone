import "../styles/inputField.sass";

export default function InputFieldEvent({ setup, onChange, value }) {
  const { label, placeholder, type, required } = setup;

  return (
    <label className="input-field-block">
      {label}
      <input
        placeholder={placeholder}
        value={value}
        required={required}
        type={type}
        onChange={onChange}
      />
    </label>
  );
}
