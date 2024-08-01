import InputMask from 'react-input-mask';

export default function InputForm({label, onChange, mask, value}){
    
    return(
        <div className="flex flex-col">
            <label htmlFor="" className="text-gray-500 text-sm">{label}:</label>
            <InputMask mask={mask} onChange={onChange} value={value} type="text" className="px-4 py-2 rounded-sm drop-shadow-sm outline-none focus:drop-shadow-md" />
        </div>
    )
}