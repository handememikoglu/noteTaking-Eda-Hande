import { FaSearch } from "react-icons/fa";
import { FaArrowUpFromBracket, FaGear, FaHouse, FaTag } from "react-icons/fa6";

export default function Sidebar({ currentPage, changeMenu }) {
    return (
        <div className="fixed bottom-0 w-full md:w-64 bg-gray-100 text-white flex md:flex-col md:h-screen md:relative">
            <ul className="flex md:flex-col w-full justify-around md:justify-start">
                <li className="p-6">
                    <a
                        href="/"
                        onClick={(e) => changeMenu(e, "/")}
                        className="cursor-pointer"
                    >
                        <FaHouse
                            className={`text-gray-500 ${
                                currentPage === "/" ? "text-blue-500" : ""
                            }`}
                        />
                    </a>
                </li>
                <li className="p-6">
                    <a
                        href="/Arama"
                        onClick={(e) => changeMenu(e, "/Arama")}
                        className="cursor-pointer"
                    >
                        <FaSearch
                            className={`text-gray-500 ${
                                currentPage === "/Arama" ? "text-blue-500" : ""
                            }`}
                        />
                    </a>
                </li>
                <li className="p-6">
                    <a
                        href="/Arsiv"
                        onClick={(e) => changeMenu(e, "/Arsiv")}
                        className="cursor-pointer"
                    >
                        <FaArrowUpFromBracket
                            className={`text-gray-500 ${
                                currentPage === "/Arsiv" ? "text-blue-500" : ""
                            }`}
                        />
                    </a>
                </li>
                <li className="p-6">
                    <a
                        href="/Etiketler"
                        onClick={(e) => changeMenu(e, "/Etiketler")}
                        className="cursor-pointer"
                    >
                        <FaTag
                            className={`text-gray-500 ${
                                currentPage === "/Etiketler"
                                    ? "text-blue-500"
                                    : ""
                            }`}
                        />
                    </a>
                </li>
                <li className="p-6">
                    <a
                        href="/Ayarlar"
                        onClick={(e) => changeMenu(e, "/Ayarlar")}
                        className="cursor-pointer"
                    >
                        <FaGear
                            className={`text-gray-500 ${
                                currentPage === "/Ayarlar"
                                    ? "text-blue-500"
                                    : ""
                            }`}
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
}
