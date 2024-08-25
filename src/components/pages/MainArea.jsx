
import { Link } from "react-router-dom"

export default function MainArea(){  


    let content = (
        <>
            <h2>Welcome!</h2>
            <p className='pt-4'>This website is a Proof of Concept / Portfolio Project by <Link className = 'px0 green-bold-link' to={"https://www.linkedin.com/in/viktoria-sudraba/"}>VikSil</Link>.</p>
            <p className='pt-1'>(the concept being that I can code and know something about how finance systems work)</p>
            <p className='pt-1'>Before judging, please be mindful that I am only one person. Comercial projects of this type are built by teams of dozens of developers over months and years.</p>
            <p className='pt-1'>If you would like to collaborate, I am open to conversation.</p>

            <p className='pt-1'>The backend repository can be found <Link className = 'px0 green-bold-link' to={"https://github.com/VikSil/howtoquant-backend"}>here</Link>.</p>
            <p className='pt-1'>The frontend repository can be found <Link className = 'px0 green-bold-link' to={"https://github.com/VikSil/howtoquant-frontend"}>here</Link>.</p>

            <p className='pt-5 fst-italic'>This is a hobby project. For entertainment and education purposes only.</p><p className='fst-italic'>No part of this website is financial advice.</p>
        </>         
    )

    return (
        <main className = "d-flex flex-column flex-fill p-5">
            {content}
        </main>
    )

}