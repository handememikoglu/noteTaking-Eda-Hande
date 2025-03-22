import { useState } from "react";
import { FaTag } from "react-icons/fa6";

export default function Tags({ notes, archivedNotes }) {
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

    const [selectedTag, setSelectedTag] = useState(null);

    const filteredNotes = selectedTag
        ? [...notes, ...archivedNotes].filter((note) => note.tags.includes(selectedTag))
        : []

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {options.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-md ${
                            selectedTag === tag
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {selectedTag && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Notes for "{selectedTag}"</h3>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <div key={note.id} className="p-4 mt-4 border rounded-md">
                                <p>{note.content}</p>
                                <p className="text-sm text-gray-500">{note.date}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">No notes found for this tag.</p>
                    )}
                </div>
            )}
        </div>
    );
}

