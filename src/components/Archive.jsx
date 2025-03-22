export default function Archive({ archivedNotes, setNotes, setArchivedNotes }) {
    const unarchiveNote = (id) => {
        const noteToUnarchive = archivedNotes.find((note) => note.id === id);
        if (noteToUnarchive) {
            setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
            setNotes((prev) => [...prev, noteToUnarchive]);
        }
    };
    return (
        <div className="mt-8">
            <h3 className="font-semibold">Archived Notes</h3>
            <div className="mt-4">
                {archivedNotes.length === 0 ? (
                    <p className="text-gray-500">No archived notes yet.</p>
                ) : (
                    archivedNotes.map((anote) => (
                        <div
                            key={anote.id}
                            className="p-4 mb-4 border-b-2 border-gray-400 rounded-md"
                        >
                            <p>{anote.content}</p>
                            <div className="flex gap-2 mt-2">
                                {anote.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-2 text-sm text-gray-500">
                                {anote.date}
                            </p>

                            <button
                                onClick={() => unarchiveNote(anote.id)}
                                className=" cursor-pointer mt-2 px-4 py-1 bg-yellow-500 text-white rounded-md"
                            >
                                Unarchive
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
