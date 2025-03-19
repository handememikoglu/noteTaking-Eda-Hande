import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
    const [page,setPage] = useState(window.location.pathname);

    useEffect(() =>{
        const handlePopState = () => setPage(window.location.pathname);
        window.addEventListener('popstate',handlePopState);

        return () => window.removeEventListener('popstate',handlePopState);
    },[])

    const navigate = (path) => {
        window.history.pushState({},"",path);
        setPage(path);
    }
    return (
        <>
            <Sidebar navigate={navigate}/>
        </>
    );
}

export default App;
