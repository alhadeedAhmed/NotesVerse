import { FilePlusIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-10 shadow-lg">
        <FilePlusIcon className="size-12 text-primary" />
      </div>
      <h3 className="text-3xl font-bold text-primary">No Notes Yet!</h3>
      <p className="text-base-content/70 leading-relaxed">
        Your notebook is waiting! <br />
        Start by creating your first note and bring your ideas to life.
      </p>
      <Link to="/create" className="btn btn-primary text-white">
        <FilePlusIcon className="size-5 mr-2" />
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
