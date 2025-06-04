import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user", user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [showPopover, setShowPopover] = useState(false);


  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
                {/* {user ? (
                  <li>
                    <button
                      onClick={logoutHandler}
                      className=" bg-slate-600 text-white rounded-md px-3 py-1"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  ""
                )} */}
              {user && (
  <div className="relative pl-4">
    {/* Toggle Button */}
    <button
      onClick={() => setShowPopover((prev) => !prev)}
      className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-md px-3 py-1 font-medium transition"
    >
    Profile
    </button>

    {/* Controlled Popover */}
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      {/* Dummy Popover Trigger (not used visually) */}
      <PopoverTrigger asChild>
        <div />
      </PopoverTrigger>

      <PopoverContent className="w-80 shadow-lg border rounded-xl p-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
              alt="User Avatar"
            />
          </Avatar>

          {/* User Info */}
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">
              {user?.fullname || "John Doe"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {user?.profile?.bio || "Passionate learner and job seeker."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col mt-4 gap-2">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <User2 className="w-4 h-4" />
            View Profile
          </Link>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 text-sm text-red-600 hover:underline"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)}

   

              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-black bg-red ">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
