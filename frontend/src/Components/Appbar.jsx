export function Appbar({ name }) {

 
    console.log(name +' '+typeof name);
    return <div className="flex justify-between pl-4 pr-5 pb-2 border-b-2">
        <div className="font-bold text-2xl pt-2">
            Payments App
        </div>

       
        <div className="font-medium flex">
            Hello, {name}
            {/* <button className="rounded-full bg-gray-300 p-2 w-1/2">{name[0]} </button> */}
            {/* <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl pb-1">
                    {name[0]}
                </div>
            </div> */}
        </div>
        
    </div>
}