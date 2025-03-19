export default function Archive({ archivedNotes }) {
    return (
        <div className="mt-8">
            <h3 className="font-semibold">Archived Notes</h3>
            <div className="mt-4">
                {archivedNotes.map((anote) => (
                    <div
                        key={anote.id}
                        className=" p-4  mb-4 border-b-1 border-gray-400"
                    >
                        <p>{anote.content}</p>
                        <div className="flex gap-2 mt-2">
                            {anote.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-300 text-black rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            {anote.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
