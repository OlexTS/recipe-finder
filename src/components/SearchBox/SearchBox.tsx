import { useState } from "react";

interface SearchBoxProps {
  onSubmit: (query: string) => void;
}

const SearchBox = ({ onSubmit }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue.trim());
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter recipe"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
