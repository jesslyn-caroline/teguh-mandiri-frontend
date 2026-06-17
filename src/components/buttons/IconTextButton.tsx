import { type RemixiconComponentType } from "@remixicon/react"

interface Props {
    Icon: RemixiconComponentType,
    title: string,
    text: string,
    onClick: () => void
}

function IconTextButton({ Icon, title, text, onClick }: Props) {
    return (
    <button 
        title={title}
        className={`w-fit flex flex-row items-center gap-x-2 py-2.5 pl-2 pr-3 bg-blue-500 rounded-md`}
        onClick={onClick}
    >
        <Icon className={`size-5.5 text-white`}/>
        <span className={`text-sm font-bold text-white`}>{ text }</span>
    </button>
)}

export default IconTextButton