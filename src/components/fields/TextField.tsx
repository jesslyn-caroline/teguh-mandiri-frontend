interface Props {
    title: string,
    type: string,
    id: string
}

function TextField({ id, title, type}: Props) {
    return (
    <div className={`w-full flex flex-col gap-y-1`}>
        <label htmlFor={id} className={`text-gray-600 text-sm uppercase font-bold`}>{ title }</label>
        <input type={type} name={id} id={id} title={title} className={`border border-gray-500 rounded-md text-sm px-3 py-2.5`}/>
    </div>
)}

export default TextField