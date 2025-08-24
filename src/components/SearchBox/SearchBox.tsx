
interface SearchBoxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    return (
        <input type="text" value={value} onChange={onChange} placeholder="Enter recipe" />
    )
}

export default SearchBox