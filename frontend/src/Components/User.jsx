import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
export function User({ user }) {

    const navigate = useNavigate();
    return <div>
 

        <div key = {user._id} className="flex justify-between h-10 mb-5">
            <div className="flex ">
                {/* <button className="rounded-full bg-gray-300 p-4 w-full ml-2 h-5 w-5">{user[0]} </button> */}
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="font-medium p-3 pt-4"> {user.firstName} {user.lastName}</div>
            </div>
            <div className="p-3">
                <Button label={'Send Money'} onclick={()=> navigate(`/send?id=${user._id}&name=${user.firstName}`)}></Button>
            </div>
        </div>

    </div>
}