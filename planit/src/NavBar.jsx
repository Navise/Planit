import DateTime from "./DateTime";

function Nav(){
    return(
        <div className="w-full bg-black flex">
            <div className="w-1/2">
                <h1 className="text-white font-bold text-2xl ml-20 py-2">Plannit</h1>
            </div>
            <div className="w-1/2">
                <DateTime />
            </div>
        </div>
    )
}

export default Nav;