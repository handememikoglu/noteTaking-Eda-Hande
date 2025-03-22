import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Archive from "./components/Archive";
import Tags from "./components/Tags";
import Settings from "./components/Settings";

function App() {
    const [page, setPage] = useState(window.location.pathname);
    const [notes, setNotes] = useState(
        localStorage.getItem("notes")
            ? JSON.parse(localStorage.getItem("notes"))
            : []
    );
    const [archivedNotes, setArchivedNotes] = useState(
        localStorage.getItem("archivedNotes")
            ? JSON.parse(localStorage.getItem("archivedNotes"))
            : []
    );
    useEffect(() => {
        console.log(notes);
        console.log(archivedNotes);

        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
    }, [notes, archivedNotes]);

    const archiveNote = (id) => {
        const noteToArchive = notes.find((note) => note.id === id);

        if (noteToArchive) {
            setNotes(notes.filter((note) => note.id !== id));
            setArchivedNotes([...archivedNotes, noteToArchive]);
        }
    };

    useEffect(() => {
        const handlePopState = () => setPage(window.location.pathname);
        window.addEventListener("popstate", handlePopState);

        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const changeMenu = (e, page) => {
        e.preventDefault();
        navigate(page);
    };

    const navigate = (path) => {
        window.history.pushState({}, "", path);
        setPage(path);
    };
    return (
        <>
            <button
                className="flex items-center ml-3 gap-2 cursor-pointer"
                onClick={(e) => changeMenu(e, "/")}
            >
                <img className="w-5" src="/feather.png" alt="Feather" />
                <h1 className="font-bold text-xl">Notes</h1>
            </button>
            <div className="flex">
                <Sidebar
                    navigate={navigate}
                    currentPage={page}
                    changeMenu={changeMenu}
                />
                <div className="flex-1 p-4">
                    {page === "/" && (
                        <HomePage
                            notes={notes}
                            setNotes={setNotes}
                            archiveNote={archiveNote}
                            navigate={navigate}
                            changeMenu={changeMenu}
                        />
                    )}
                    {page === "/Arama" && <Search />}
                    {page === "/Arsiv" && (
                        <Archive archivedNotes={archivedNotes} />
                    )}
                    {page === "/Etiketler" && <Tags notes={notes} archivedNotes={archivedNotes}/>}
                    {page === "/Ayarlar" && <Settings />}
                </div>
            </div>
        </>
    );
}

export default App;
