import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const options = [
    "Cooking",
    "Dev",
    "Fitness",
    "Health",
    "Personal",
    "React",
    "Recipes",
    "Shopping",
    "Travel",
    "TypeScript",
];

export default function HomePage({
    notes,
    setNotes,
    archiveNote,
    showSearch,
    setFilteredNotes,
}) {
    const [showInput, setShowInput] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [noteContent, setNoteContent] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setLocalFilteredNotes] = useState(notes);

    const ChoseTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((item) => item !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = (e) => {
        setNoteContent(e.target.value);
    };

    const handleCreateNote = () => {
        if (!noteContent.trim() || selectedTags.length === 0) {
            alert("Lütfen not içeriğini girin ve en az bir etiket seçin!");
            return;
        }

        const newNote = {
            id: Date.now(),
            content: noteContent,
            tags: selectedTags,
            date: new Date().toLocaleDateString(),
        };

        setNotes((prev) => [...prev, newNote]);
        setNoteContent("");
        setSelectedTags([]);
        setShowInput(false);
    };;

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredNotes(notes);
            setLocalFilteredNotes(notes);
            return;
        }

        const filtered = notes.filter(
            (note) =>
                note.content
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                note.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
        );

        setFilteredNotes(filtered);
        setLocalFilteredNotes(filtered);
        console.log(filtered);
    }, [searchQuery, notes, setFilteredNotes]);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDay = date.getDate();

    return (
        <div className="p-4">
            {showSearch && (
                <div className="flex items-center gap-2 p-2 border rounded-lg mb-4">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by title, content, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            )}
            <div className="flex items-center px-16 py-8">
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="w-full py-[10px] bg-blue-600 rounded-lg text-blue-50 cursor-pointer"
                >
                    + Create New Note
                </button>
            </div>
    
            {showInput && (
                <div className="p-4  rounded-lg">
                    <input
                        type="text"
                        name="text"
                        value={noteContent}
                        onChange={handleSubmit}
                        placeholder="Enter note..."
                        className="w-full p-2 border rounded-md"
                    />
                    <div className="mt-4">
                        <label className="block font-semibold">Tags</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {options.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => ChoseTag(tag)}
                                    className={`px-3 py-1 rounded-md ${
                                        selectedTags.includes(tag)
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <span>{`${currentDay}/${month}/${year}`}</span>
                    </div>
    
                    <button
                        onClick={handleCreateNote}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                        Save Note
                    </button>
                </div>
            )}
    
            <div className="mt-8">
                <h3 className="font-semibold">Saved Notes</h3>
                <div className="mt-4">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="p-4 mb-4 border-b-1 border-gray-400">
                            <p>{note.content}</p>
                            <div className="flex gap-2 mt-2">
                                {note.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-300 text-black rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => archiveNote(note.id)}
                                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-md cursor-pointer"
                            >
                                Archive
                            </button>
                            <p className="mt-2 text-sm text-gray-500">{note.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
