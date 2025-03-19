import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowUpFromBracket, FaGear, FaHouse, FaTag } from "react-icons/fa6";
import HomePage from "./HomePage";
import Search from "./Search";
import Archive from "./Archive";
import Tags from "./Tags";
import Setting from "./Settings";

export default function Sidebar({navigate}){

    const [currentPage,setCurrentPage] = useState("/")

    const changeMenu = (e,page) => {
        e.preventDefault();
        const link = e.target.closest("a");
        if (link) {
            const path = new URL(link.href, window.location.origin).pathname;
            navigate(path);
        }
        setCurrentPage(page);
    }

    {currentPage === "/" && <HomePage/>}
    {currentPage === "Arama" && <Search />}
    {currentPage == "/Arsiv" && <Archive />}
    {currentPage === "/Etiketler" && <Tags/>}
    {currentPage === "/Ayarlar" && <Setting/>}
    console.log(currentPage);
    
    return(

        <div className="flex flex-col md:flex-row">
             <div className="flex-1">
                {currentPage === "/" && <HomePage />}
                {currentPage === "/Arama" && <Search />}
                {currentPage === "/Arsiv" && <Archive />}
                {currentPage === "/Etiketler" && <Tags />}
                {currentPage === "/Ayarlar" && <Setting />}
            </div>
            <div className="fixed bottom-0 w-full md:w-64 bg-gray-100 text-white flex md:flex-col md:h-screen md:relative">
                <ul className="flex md:flex-col w-full justify-around md:justify-start">
                    <li className="p-6">
                        <a href="/" onClick={ (e) => changeMenu(e,"/")} className="cursor-pointer">
                        <FaHouse  className="text-gray-500"/>
                        </a>
                    </li>
                    <li className="p-6">
                        <a href="/Arama" onClick={(e) => changeMenu(e,"/Arama")} className="cursor-pointer">
                            <FaSearch  className="text-gray-500"/>
                        </a>
                    </li>
                    <li className="p-6">
                        <a href="/Arsiv" onClick={(e) => changeMenu(e,"/Arsiv")} className="cursor-pointer">
                            <FaArrowUpFromBracket  className="text-gray-500"/>
                        </a>
                    </li>
                    <li className="p-6">
                        <a href="/Etiketler" onClick={(e) => changeMenu(e,"/Etiketler")} className="cursor-pointer">
                            <FaTag  className="text-gray-500"/>
                        </a>
                    </li>
                    <li className="p-6">
                        <a href="/Ayarlar" onClick={(e) => changeMenu(e,"/Ayarlar")} className="cursor-pointer">
                            <FaGear  className="text-gray-500"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}