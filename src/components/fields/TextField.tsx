interface Props {
    title: string,
    type: string,
    id: string,
    value?: string | number
}

function TextField({ id, title, type, value = '' }: Props) {
    return (
    <div className={`w-full flex flex-col gap-y-1`}>
        <label htmlFor={id} className={`text-gray-600 text-sm uppercase font-bold`}>{ title }</label>
        <input type={type} name={id} id={id} title={title} defaultValue={value} className={`border border-gray-500 rounded-md text-sm px-3 py-2.5`}/>
    </div>
)}

export default TextField