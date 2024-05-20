import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className="shad-input relative w-420">
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2 text-3xl text-light-3">
                <CiSearch />
            </div>
            <input
                type="text"
                placeholder="Search here for jobs..."
                className="h-full w-full bg-transparent placeholder:text-light-4 placeholder:font-light pr-10 text-light-2"
            />
        </div>
    );
};

export default SearchBar;
