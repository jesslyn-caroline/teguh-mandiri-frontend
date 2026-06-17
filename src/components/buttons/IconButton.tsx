import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react"

interface Props {
    type: string,
    title: string,
    onClick: () => void,
}

const variants: any = {
    edit: <RiEdit2Line className={`text-white size-5`}/>,
    delete: <RiDeleteBinLine className={`text-white size-5`}/>,
}

function IconButton({ type, title, onClick }: Props) {
    return (
    <button 
        onClick={onClick} 
        title={title} 
        className={`p-1 bg-red-500 rounded-md cursor-pointer`}
    >
        { variants[type] }
    </button>
)}

export default IconButton