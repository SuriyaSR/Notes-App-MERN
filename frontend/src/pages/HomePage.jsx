import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

import NavBar from "../components/NavBar"
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
     <NavBar />
     {isRateLimited && <RateLimitedUI /> }
     <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (<div className="text-center text-primary py-10">Loading notes...</div>) }
       {notes.length > 0 ? !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
       ) : !loading && (
        <div className="text-center text-primary py-10">No notes available. Create a new note!</div>
       )}
     </div>
    </div>
  )
}

export default HomePage
