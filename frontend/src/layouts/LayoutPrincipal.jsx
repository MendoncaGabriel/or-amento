import Menu from "../components/Menu"
export default function LayoutPrincipal({children, menu=true}){
    return(

        <section className="bg-gray-700 w-full min-h-screen bg-gradient-to-br from-indigo-200 to-purple-100 flex items-center justify-center">
            <div className=" p-5 space-x-5 rounded-md bg-indigo-700  aspect-video w-full max-w-screen-lg xl:max-w-screen-xl grid grid-cols-5 ">
                
                {menu && <Menu />}
                
                <div className={`p-5 ${menu ? 'col-span-4' : 'col-span-5'} w-auto bg-[#F5F5F3] rounded-3xl shadow-xl`}>
                    {children}
                </div>
            </div>
        </section>
    
    )
}