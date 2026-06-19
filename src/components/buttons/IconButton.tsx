import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react"

interface Props {
    type: string,
    title: string,
    onClick: (e?: any) => void,
}

const variants: any = {
    edit: {
        icon: <RiEdit2Line className={`text-white size-5`}/>,
        color: 'bg-yellow-400'
    },
    delete: {
        icon: <RiDeleteBinLine className={`text-white size-5`}/>,
        color: 'bg-red-500'
    },
}

function IconButton({ type, title, onClick }: Props) {
    return (
    <button 
        onClick={onClick} 
        title={title} 
        className={`p-1 ${variants[type].color} rounded-md cursor-pointer`}
    >
        { variants[type].icon }
    </button>
)}

export default IconButton