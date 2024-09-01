
import { Link } from "react-router-dom"

export default function MainArea(){  


    let content = (
        <>
            <h2>Welcome!</h2>
            <p className='pt-4 mb-0'>This website is a Portfolio Project / Proof of Concept by me, <Link className = 'px0 green-bold-link' to={"https://www.linkedin.com/in/viktoria-sudraba/"}>VikSil</Link>.</p>
            <p className='small'>(the concept being that I can code and know something about building information systems)</p>
            <p className='pt-3'>Before judging, please be mindful that I am only one person. <br></br> Commercial projects of this type are built by teams of dozens of developers over months and years. <br></br>
            If you would like to collaborate, I am open to conversation.</p>

            <p className='pt-4 mb-0'>Backend repository <Link className = 'px0 green-bold-link' to={"https://github.com/VikSil/howtoquant-backend"}>here</Link>.</p>
            <p className='pt-1'>Frontend repository <Link className = 'px0 green-bold-link' to={"https://github.com/VikSil/howtoquant-frontend"}>here</Link>.</p>

            <p className='pt-4 mb-0 error-class'> If any of the links opens a blank page, please refresh the website and try again.<br></br> Backend is hosted on a free tier and may take some time to 'wake up'.</p>

            <p className='pt-5 fst-italic'>This is a hobby project. For entertainment and education purposes only. <br></br>No part of this website is financial advice.</p>
        </>         
    )

    return (
        <main className = "d-flex flex-column flex-fill p-5">
            {content}
        </main>
    )

}