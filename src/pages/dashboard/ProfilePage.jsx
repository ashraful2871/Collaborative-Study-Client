import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const ProfilePage = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="border shadow-xl rounded-lg p-6 max-w-sm w-full text-center">
        <div className="avatar mb-4">
          <div className="w-24 h-24 rounded-full mx-auto border-4 border-primary overflow-hidden">
            <img
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-base-content">
          {user?.displayName}
        </h2>
        <div className="text-gray-500 flex items-center justify-center gap-2 mt-2">
          <FaEnvelope className="text-primary" />
          <span className="text-base-content">{user?.email}</span>
        </div>
        <div className="text-gray-500 flex items-center justify-center gap-2 mt-1">
          <FaUserTag className="text-primary" />
          <span className="text-base-content">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
