import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob } from "@/hooks/useSavedJobsActions";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedItems = useSelector((s) => s.savedJobs.items);
  const { user } = useSelector((s) => s.auth); // ✅ get logged-in user

  const isSaved = useMemo(
    () => savedItems?.some((j) => j._id === job?._id),
    [savedItems, job?._id]
  );

  const onSaveClick = () => {
    if (!user) {
      // ✅ redirect to login if not logged in
      
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

  return (
    <div className="p-10 rounded-2xl shadow-xl border border-gray-700 bg-slate-900/70 text-white cursor-pointer transition-transform transform hover:scale-105 duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        {/* ✅ Bookmark icon only works if logged in */}
        {user ? (
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={onSaveClick}
          >
            {isSaved ? (
              <BookmarkCheck className="text-cyan-400" />
            ) : (
              <Bookmark className="text-gray-500" />
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={() => navigate("/login")}
          >
            <Bookmark className="text-gray-500" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-white">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-400">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-cyan-400">{job?.title}</h1>
        <p className="text-sm text-gray-300">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className={"bg-blue-800 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"bg-red-800 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"bg-purple-800 font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>

        {/* ✅ Save button respects login */}
        {user ? (
          <Button
            onClick={onSaveClick}
            className={isSaved ? "bg-gray-500" : "bg-cyan-700"}
          >
            {isSaved ? "Unsave" : "Save For Later"}
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-cyan-700 text-white"
          >
            Save For Later
          </Button>
        )}
      </div>
    </div>
  );
};

export default Job;
