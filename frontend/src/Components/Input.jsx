export function Input({ label, placeholder ,onchange }) {

    return <div className="pl-8 pr-8 mb-3">
        <div className="font-medium  text-left mb-2">
            {label}
        </div>
        <input className="border rounded w-full border-slate-200 p-2" type="text" placeholder={placeholder}  onChange = {onchange}></input>


    </div>
}