import { FC, FormEvent, useRef, useState } from "react";

type Element = { name: string; id: number };
type Props = {
  elements: Element[];
  onSelectValue: (id: number) => void;
  label: string;
  placeholder?: string;
};

const Dropdown: FC<Props> = ({
  elements,
  onSelectValue,
  label,
  placeholder = "Enter a value",
}) => {
  const [filteredElements, setFilteredElements] = useState<Element[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      const filtered = elements.filter(({ name }) => name.includes(value));
      setFilteredElements(filtered);
    } else {
      setFilteredElements([]);
    }
  };

  const handleElementClick = ({ id, name }: Element) => {
    if (inputRef.current) inputRef.current.value = name;
    onSelectValue(id);
    setFilteredElements([]);
  };

  return (
    <div className="w-full p-4">
      <label className="block">
        <span className="block">{label}</span>
        <input
          placeholder={placeholder}
          className="block p-2 w-full text-[#2F2963] border-solid border-2 rounded"
          onChange={handleInputChange}
          ref={inputRef}
        />
      </label>
      <div className="my-2 rounded shadow">
        {filteredElements.map(({ name, id }) => (
          <div
            className="hover:bg-[#DED9E2] p-2 cursor-pointer"
            key={id}
            onClick={() => handleElementClick({ id, name })}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
