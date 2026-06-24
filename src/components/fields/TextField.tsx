interface Props {
    needLabel?: boolean,
    title: string,
    type: string,
    id: string,
    value?: string | number | readonly string[],
    onChange?: (e: any) => void,
    onFocus?: () => void
    disabled?: boolean
}

function TextField({ needLabel=true, id, title, type, value, onChange, onFocus, disabled=false }: Props) {
    return (
    <div className={`w-full flex flex-col gap-y-1`}>
        { needLabel && <label htmlFor={id} className={`text-gray-600 text-sm uppercase font-bold`}>{ title }</label> }
        <input type={type} name={id} id={id} title={title} value={value} onChange={onChange} className={`border border-gray-500 ${disabled ? 'bg-gray-100' : 'bg-white'} rounded-md text-sm px-3 py-2.5`} onFocus={onFocus} disabled={disabled}/>
    </div>
)}

export default TextField