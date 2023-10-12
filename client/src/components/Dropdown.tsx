import { FC, FormEvent, useRef, useState, KeyboardEvent } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      const filtered = elements.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredElements(filtered);
    } else {
      setFilteredElements([]);
    }
  };

  const reset = () => {
    if (inputRef.current) inputRef.current.value = "";
    setSelectedIndex(0);
  };

  const handleElementClick = ({ id, name }: Element) => {
    reset();
    onSelectValue(id);
    setFilteredElements([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" && selectedIndex < filteredElements.length - 1) {
      e.preventDefault();
      setSelectedIndex((prev) => prev + 1);
    }
    if (e.key === "ArrowUp" && selectedIndex > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => prev - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleElementClick(filteredElements[selectedIndex]);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      reset();
      setFilteredElements([]);
    }
  };

  return (
    <div className="w-full pl-4 py-4 relative">
      <label className="block w-full">
        <span className="block">{label}</span>
        <input
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="block p-2 w-full text-[#2F2963] border-solid border-2 rounded"
          onChange={handleInputChange}
          ref={inputRef}
        />
      </label>
      <div className="my-2 rounded shadow absolute z-10 bg-white left-4  right-0">
        {filteredElements.map(({ name, id }, i) => (
          <div
            className="p-2 cursor-pointer"
            key={id}
            onClick={() => handleElementClick({ id, name })}
            onMouseOver={() => {
              setSelectedIndex(i);
            }}
            style={
              selectedIndex === i ? { backgroundColor: "#DED9E2" } : undefined
            }
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
