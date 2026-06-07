import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { ArrowUpRight, Bookmark, BookmarkCheck, Building2, Clock3, IndianRupee, MapPin, Send } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob } from "@/hooks/useSavedJobsActions";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedItems = useSelector((s) => s.savedJobs.items);
  const { user } = useSelector((s) => s.auth);

  const isSaved = useMemo(
    () => savedItems?.some((j) => j._id === job?._id),
    [savedItems, job?._id]
  );

  const onSaveClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(toggleSaveJob(job._id, isSaved));
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);
  const isNew = daysAgo <= 2;

  const logoFallback = `https://logo.clearbit.com/${(job?.company?.name || "google").toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-teal-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-100">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-gradient-to-br from-teal-50 to-emerald-50" />

      <div className="relative flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-brand-muted">
          <Clock3 className="h-4 w-4 text-brand-accent" />
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </span>
        {isNew && <span className="rounded-md bg-teal-50 px-3 py-2 text-xs font-bold text-brand-accent">New</span>}
      </div>

      <div className="relative my-5 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-teal-50 to-emerald-50">
          {job?.company?.logo ? (
            <Avatar className="h-11 w-11 rounded-lg">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          ) : (
            <img src={logoFallback} alt={`${job?.company?.name || "Company"} logo`} className="h-10 w-10 rounded-lg object-contain" />
          )}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-brand-text">
            {job?.company?.name || "Company"}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-brand-muted">
            <MapPin className="h-3.5 w-3.5" />
            {job?.location || "India"}
          </p>
        </div>
        <Button
          aria-label={isSaved ? "Unsave job" : "Save job"}
          variant="outline"
          className="ml-auto h-10 w-10 rounded-lg border-teal-100 bg-white text-brand-primary hover:bg-teal-50"
          size="icon"
          onClick={onSaveClick}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </Button>
      </div>

      <div className="relative flex-1">
        <h2 className="line-clamp-2 text-xl font-black text-brand-text">{job?.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-muted">{job?.description}</p>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="flex items-center gap-1 text-xs font-semibold text-brand-muted"><IndianRupee className="h-3.5 w-3.5" /> Salary</p>
          <p className="mt-1 font-bold text-brand-text">{job?.salary} LPA</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold text-brand-muted">Openings</p>
          <p className="mt-1 font-bold text-brand-text">{job?.position} Positions</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <Badge className="rounded-lg bg-teal-50 font-semibold text-brand-primary hover:bg-teal-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="rounded-lg bg-slate-100 font-semibold text-brand-secondary hover:bg-slate-200" variant="ghost">
          {job?.experience || 0}+ yrs
        </Badge>
        <Badge className="rounded-md bg-teal-50 font-semibold text-brand-accent hover:bg-teal-100" variant="ghost">
          Flexible
        </Badge>
      </div>

      <div className="relative mt-5 grid grid-cols-[1fr_auto] gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="rounded-md primary-gradient"
        >
          <Send className="mr-2 h-4 w-4" />
          Quick Apply
        </Button>

        <Button
          aria-label="View details"
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="h-10 w-10 rounded-md border-teal-100 text-brand-primary hover:bg-teal-50"
          size="icon"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};

export default Job;
