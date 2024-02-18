import { useEffect, useState } from "react";
import { User } from "./User";
import axios from 'axios'

export function Users() {

    const [filter, setFilter] = useState('');
    const [users, setUsers] = useState([])

    function debouce(e){
        clearTimeout();
        setTimeout(()=> {
            setFilter(e.target.value);
        },2000);
    }

    useEffect(() => {

        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((res) => {
            setUsers(res.data.Users);
        });
     }, [filter]);
    return <div className="p-4">
        <div className="font-bold text-xl mb-3">
            Users
        </div>
        <div>
            <input placeholder="Search users..." type="text" className="border rounded w-full border-slate-400 placeholder- pl-3 mb-3" onChange={(e) => {
                debouce(e);
            }}></input>
        </div>
        <div>
            {users.map(user => <User key = {user._id} user={user} />)}
        </div>
    </div>
}
