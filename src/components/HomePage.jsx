import { useEffect, useState } from "react";

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

export default function HomePage({ notes, setNotes, archiveNote }) {
    const [showInput, setShowInput] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [noteContent, setNoteContent] = useState("");

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
        if (noteContent) {
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
        } else {
            alert("Lütfen not içeriğini girin!");
        }
    };

    useEffect(() => {
        console.log(notes);

        localStorage.setItem(
            "notes",
            JSON.stringify(
                notes.filter(
                    (note) => note.noteContent != "" && note.selectedTags != ""
                )
            )
        );
    }, [notes]);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDay = date.getDay();

    return (
        <div>
            <div className="flex items-center px-16 py-8">
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="w-full py-[10px] bg-blue-600 rounded-lg text-blue-50"
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
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className=" p-4  mb-4 border-b-1 border-gray-400"
                        >
                            <p>{note.content}</p>
                            <div className="flex gap-2 mt-2">
                                {note.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-300 text-black rounded-md"
                                    >
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
                            <p className="mt-2 text-sm text-gray-500">
                                {note.date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
