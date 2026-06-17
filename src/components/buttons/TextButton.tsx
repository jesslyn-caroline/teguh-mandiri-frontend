interface Props {
    text: string,
    type: "submit" | "reset" | "button"
}

function TextButton({ text, type }: Props) {
    return (
    <button 
        type={type}
        className={`px-6 py-2 bg-blue-500 rounded-lg text-white text-md font-medium`}
    >   
        { text }
    </button>       
)}

export default TextButton