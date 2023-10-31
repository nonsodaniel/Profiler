interface IInputProps {
  id: string;
  className: string;
  type: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: () => void;
  dataTestId: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const Input = ({
  id,
  className,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  required,
  dataTestId,
  inputRef,
}: IInputProps) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        value={value}
        maxLength={35}
        onChange={onChange}
        required={required}
        onFocus={onFocus}
        data-testid={dataTestId}
        ref={inputRef}
      />
      <span className="cancel-wrap pointer">X</span>
    </div>
  );
};

export default Input;
