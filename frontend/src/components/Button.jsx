export default function Button({bg, py=1, color, onClick, children}){
    const handleOnClick = () => {
        onClick && onClick()
    }
    return (
        <button 
            onClick={handleOnClick}
            className={`bg-${bg ? bg : "indigo"}-700 hover:bg-${bg ? bg : "indigo"}-600 duration-200 hover:drop-shadow-lg text-${color ? color : "white"} font-semibold rounded-md px-4 py-${py}`}
        >
            {children}
        </button>
    )
}