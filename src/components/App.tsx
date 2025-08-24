import { useState } from "react";
import SearchBox from "./SearchBox/SearchBox";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  return (
    <>
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
    </>
  );
}

export default App;
