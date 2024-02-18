import {Link} from 'react-router-dom'
export function Warning({label, buttonText,to}){
     return <div className="flex justify-center p-3">
        <div className="font-medium">
        {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to ={to}>
           {buttonText}        
        </Link>
     </div>
}