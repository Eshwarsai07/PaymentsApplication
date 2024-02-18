export function Balance({balance}){

    return <div className="flex"> 
        <div className="font-bold text-xl p-4">
           Your Balance 
        </div>
        <div className="font-medium text-l p-5">
        Rs {balance}
        </div>
    </div>
}