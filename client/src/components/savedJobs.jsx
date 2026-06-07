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
      navigate("/login");
      return;
    }
    dispatch(fetchSavedJobs());
  }, [dispatch, user, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="page-shell min-h-screen py-12">
          <p className="professional-card p-8 text-center text-slate-500">Loading saved jobs...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="page-shell flex-grow py-12">
        <div className="mb-8">
          <p className="section-eyebrow">Your shortlist</p>
          <h1 className="section-title mt-2">Saved jobs</h1>
        </div>

        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No saved jobs yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((job) => <Job key={job._id} job={job} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedJobs;
