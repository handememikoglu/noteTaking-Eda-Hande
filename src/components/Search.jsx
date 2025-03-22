import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Search({ notes, setFilteredNotes, filteredNotes }) {
    const searchParams = new URLSearchParams(window.location.search);

    const [filter, setFilter] = useState({
        notes: searchParams.get("notes") || "",
    });

    useEffect(() => {
        if (!filter.notes) {
            setFilteredNotes(notes);
            return;
        }

        const filtered = notes.filter((note) => {
            return (
                note.content
                    .toLowerCase()
                    .includes(filter.notes.toLowerCase()) ||
                note.tags.some((tag) =>
                    tag.toLowerCase().includes(filter.notes.toLowerCase())
                )
            );
        });

        setFilteredNotes(filtered);
        console.log(filtered);
    }, [filter, notes, setFilteredNotes]);

    const handleSearchChange = (e) => {
        const key = e.target.name;
        const value = e.targer.value;
        setFilter({
            ...filter,
            [key]: value,
        });
        if (value) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
        if (searchParams.toString()) {
            window.history.pushState({}, "", `?${searchParams.toString()}`);
        } else {
            console.log("search yok");
            window.history.pushState({}, "", "/");
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2 p-2 border rounded-lg mb-4">
                <FaSearch />
                <input
                    name="notes"
                    type="text"
                    placeholder="Search by title, content, or tags..."
                    value={filter.notes}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <div>
                {(filteredNotes ?? []).length > 0 ? (
                    filteredNotes.map((note) => (
                        <div key={note.id} className="p-4 border-b">
                            <p>{note.content}</p>
                            <div className="flex gap-2 mt-2">
                                {note.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-300 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notes found</p>
                )}
            </div>
        </div>
    );
}
