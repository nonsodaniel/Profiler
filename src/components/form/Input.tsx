import { AiOutlineSearch } from "react-icons/ai";

interface IInputProps {
  id: string;
  className: string;
  type: string;
  placeholder: string;
  value: string | undefined;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  dataTestId: string;
  inputRef?: React.RefObject<HTMLInputElement>;
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
      <span className="search-icon__wrap pointer">
        <AiOutlineSearch />
      </span>
    </div>
  );
};

export default Input;
