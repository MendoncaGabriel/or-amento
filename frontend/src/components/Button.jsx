export default function Button({bg, py=1, color, onClick, children, width, scalebg}){
    const handleOnClick = () => {
        onClick && onClick()
    }
    return (
        <button 
            onClick={handleOnClick}
            className={`bg-${bg ? bg : "indigo"}-${scalebg ? scalebg : "700"} ${width && "w-"+width } flex items-center justify-center hover:bg-${bg ? bg : "indigo"}-600 duration-200 hover:drop-shadow-lg text-${color ? color : "white"} font-semibold rounded-md px-4 py-${py}`}
        >
            {children}
        </button>
    )
}