import GreenLoader from '../primitives/GreenLoader'

export default function Loading(){
    return (
        <main className="mx-5 mt-4 ">
            <p className="text-center mb-4">Loading, please wait...</p>     
            <GreenLoader/>
        </main>        
    )
}