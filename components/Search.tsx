import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Search: React.FC<SearchProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-center gap-4 mt-6">
        <input
          type="search"
          name="search"
          id="search"
          value={value}
          onChange={onChange}
          placeholder="Search location"
          className="bg-transparent border-b-2 border-white pb-2 text-white outline-none capitalize focus:bg-transparent"
        />
        <FiSearch className="text-xl cursor-pointer hover:scale-125" />
      </form>
    </div>
  );
};

export default Search;
