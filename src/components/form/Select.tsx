import { IDropDownList } from "../../store/types";

interface IInputProps {
  id: string;
  className: string;
  label: string;
  ariaLabel?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  dataTestId: string;
  list: IDropDownList[];
}

const Select = ({
  className,
  label,
  ariaLabel,
  onChange,
  dataTestId,
  list,
}: IInputProps) => {
  return (
    <div className="select-wrap sort-items">
      <label htmlFor={ariaLabel} className="sort-label">
        {label}
      </label>
      <select
        className={className}
        aria-label={ariaLabel}
        onChange={onChange}
        data-testid={dataTestId}
      >
        {list.map((catgry: any) => {
          let { id, value } = catgry;
          return (
            <option key={id} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
