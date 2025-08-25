import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "@/components/Job";
import { fetchSavedJobs } from "@/hooks/useSavedJobsActions";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router";

const SavedJobs = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { items, loading } = useSelector((s) => s.savedJobs);
const { user } = useSelector((s) => s.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login"); // redirect to login if not logged in
      return;
    }
    dispatch(fetchSavedJobs());
  }, [dispatch,user, navigate]);

  if (loading) return <p className="p-4 text-white">Loading saved jobs…</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content takes available space */}
      <main className="flex-grow">
          <h1 className="text-3xl  text-white font-bold p-8">Your Saved Jobs</h1>

        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 text-white">
          {items.length === 0 ? (
            <p>No saved jobs yet.</p>
          ) : (
            items.map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default SavedJobs;
