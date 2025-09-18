import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?"))
      return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete the note. Please try again.");
    } 
  }

  const handleSave = async () => {
    console.log({note})
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update the note. Please try again.");
    } finally {
      setSaving(false);
    }
  }
  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`); // Example note ID
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]); 

  if (loading) {
    return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10 " />
    </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to={"/"} className="btn btn-ghost ">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                  <label className="label flex-col items-start w-full">
                    <span className="label-text mb-1 font-bold">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                  />                  
                </div>
                <div className="form-control mb-4">
                  <label className="label flex-col items-start w-full">
                    <span className="label-text mb-1 font-bold">Content</span>
                    <textarea
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered w-full"
                      rows={5}
                      value={note.content}
                      onChange={(e) => setNote({...note, content: e.target.value})}
                    />
                  </label>
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
