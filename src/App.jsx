import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Archive from "./components/Archive";
import Tags from "./components/Tags";
import Settings from "./components/Settings"

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
        <div className="flex">
            <Sidebar navigate={navigate} currentPage={page} />
            <div className="flex-1 p-4">
                {page === "/" && <HomePage />}
                {page === "/Arama" && <Search />}
                {page === "/Arsiv" && <Archive />}
                {page === "/Etiketler" && <Tags />}
                {page === "/Ayarlar" && <Settings />}
            </div>
        </div>
    );
}

export default App;
