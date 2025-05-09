import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const EditFollowModal = ({ user }) => {
  const { follow, isPending } = useFollow();

  return (
    <>
      <button
        onClick={() => document.getElementById("edit_follow_modal").showModal()}
      >
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <span className="font-bold text-xs">{user?.following.length}</span>
            <span className="text-slate-500 text-xs">Following</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="font-bold text-xs">{user?.followers.length}</span>
            <span className="text-slate-500 text-xs">Followers</span>
          </div>
        </div>
      </button>
      <dialog id="edit_follow_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md max-w-3xl">
          <form method="dialog" className="absolute right-2 top-2">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
          <div className="flex flex-row gap-6">
            <div className="w-full">
              <h3 className="font-bold text-lg my-3">Following</h3>
              {user?.following.map((followingUser) => (
                <Link
                  to={`/profile/${followingUser.username}`}
                  className="flex items-center justify-between gap-4"
                  key={followingUser._id}
                >
                  <div className="flex gap-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={
                            followingUser.profileImg ||
                            "/avatar-placeholder.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight truncate w-28">
                        {followingUser.fullName}
                      </span>
                      <span className="text-sm text-slate-500">
                        @{followingUser.username}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        follow(followingUser._id);
                      }}
                    >
                      {isPending ? <LoadingSpinner size="sm" /> : "Unfollow"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full">
              <h3 className="font-bold text-lg my-3">Followers</h3>
              {user?.followers.map((followerUser) => (
                <Link
                  to={`/profile/${followerUser.username}`}
                  className="flex items-center justify-between gap-4"
                  key={followerUser._id}
                >
                  <div className="flex gap-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={
                            followerUser.profileImg || "/avatar-placeholder.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight truncate w-28">
                        {followerUser.fullName}
                      </span>
                      <span className="text-sm text-slate-500">
                        @{followerUser.username}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        follow(followerUser._id);
                      }}
                    >
                      {isPending ? (
                        <LoadingSpinner size="sm" />
                      ) : user?.following?.some(
                          (f) => f._id === followerUser._id
                        ) ? (
                        "Unfollow"
                      ) : (
                        "Follow"
                      )}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditFollowModal;
