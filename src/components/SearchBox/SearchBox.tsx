import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAuthocomplete } from "../../services/recipeService";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSubmit: (query: string) => void;
}

const SearchBox = ({ onSubmit }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debaunced] = useDebounce(inputValue, 300);

  const { data: suggestions = [] } = useQuery({
    queryKey: ["autocomplete", debaunced],
    queryFn: () => fetchAuthocomplete(debaunced),
    enabled: debaunced.length > 2,
    staleTime: 1000 * 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue.trim());
    setShowSuggestions(false);
  };

  const handleSelect = (title: string) => {
    setInputValue(title);
    onSubmit(title);
    setShowSuggestions(false);
  };
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      style={{ position: "relative" }}
      onFocus={() => setShowSuggestions(true)}
    >
      <input
        className={css.input}
        id="search"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="Enter recipe"
      />
      <button className={css.button} type="submit">
        Search
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 10,
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => {
                handleSelect(s.title);
                setInputValue("");
              }}
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBox;
