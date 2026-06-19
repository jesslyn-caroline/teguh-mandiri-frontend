interface Props {
    placeholder: string,
    value: string,
    onChange: (e: any) => void,
    autofocus?: boolean
}

function SearchInput({ placeholder, value, onChange, autofocus=false }: Props) {
    return (
    <input 
        type="text" name="search" id="search" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className={`w-full border border-gray-400 rounded-md text-sm px-3 py-2.5`}
        autoFocus={autofocus}
    />
)}

export default SearchInput