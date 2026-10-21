import React from "react";
import { tabs } from "../utils/constants";
import { IoIosLogOut, IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import BookingHistory from "../components/profile/BookingHistory";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { tab } = useParams();
  const { user, logoutRequest } = useAuth();

  // Set the active tab based on the URL.
  const getActiveTab = (currentTab) => {
    const normalizedTab = (currentTab || "").toLowerCase();

    if (
      normalizedTab === "booking" ||
      normalizedTab === "orders" ||
      normalizedTab === "your orders"
    ) {
      // Use the actual label defined in your tabs array.
      return (
        tabs.find((item) =>
          ["booking", "orders", "your orders"].includes(
            item.toLowerCase()
          )
        ) || "Your Orders"
      );
    }

    return (
      tabs.find((item) => item.toLowerCase() === "profile") ||
      "Profile"
    );
  };

  const [activeTab, setActiveTab] = React.useState(() =>
    getActiveTab(tab)
  );

  // Update the active tab when the URL changes.
  React.useEffect(() => {
    setActiveTab(getActiveTab(tab));
  }, [tab]);

  const handleLogout = () => {
    logoutRequest();
  };

  const isBookingTab = [
    "booking",
    "orders",
    "your orders",
  ].includes(activeTab.toLowerCase());

  return (
    <>
      {/* Profile navigation tabs */}
      <div className="bg-[#e5e5e5]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 py-2 text-sm font-medium">
          {tabs.map((tabName) => (
            <button
              key={tabName}
              type="button"
              onClick={() => setActiveTab(tabName)}
              className={`pb-1 cursor-pointer ${
                activeTab === tabName
                  ? "text-[#f74565]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tabName.toLocaleUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main page content */}
      <div className="min-h-screen py-10 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Original Profile Section */}
          {!isBookingTab && (
            <>
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-gray-800 to-[#f74565] rounded-t-md px-6 py-6 flex items-center gap-6 text-white">
                <div className="relative w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-white text-gray-600">
                  <IoMdAdd size={24} />
                </div>

                <div className="mt-2">
                  <h2 className="text-2xl font-bold">
                    Hi, {user?.name}
                  </h2>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="underline cursor-pointer"
                  >
                    <IoIosLogOut
                      size={20}
                      className="inline"
                    />{" "}
                    Logout
                  </button>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-white px-6 py-6 rounded-b-md">
                <h3 className="text-lg font-semibold mb-4">
                  Account Details
                </h3>

                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-normal">
                    Email Address
                  </p>

                  <div className="flex items-center gap-2">
                    <span>{user?.email}</span>

                    <span className="text-green-600 text-xs bg-green-100 px-2 rounded">
                      Verified
                    </span>
                  </div>

                  <FiEdit className="text-pink-500 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal">
                    Mobile Number
                  </p>

                  <div className="flex items-center gap-2">
                    <span>
                      +91-{user?.phone || 91222222222}
                    </span>

                    <span className="text-green-600 text-xs bg-green-100 px-2 rounded">
                      Verified
                    </span>
                  </div>

                  <FiEdit className="text-pink-500 cursor-pointer" />
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white p-6 mt-4 rounded-md">
                <h3 className="text-lg font-semibold mb-4">
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-normal">
                      Name
                    </label>

                    <input
                      type="text"
                      value={user?.name || ""}
                      readOnly
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-normal">
                      Birthday (Optional)
                    </label>

                    <input
                      type="date"
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-normal">
                      Identity (Optional)
                    </label>

                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        className="px-4 py-1 border border-gray-200 rounded-lg bg-white"
                      >
                        Woman
                      </button>

                      <button
                        type="button"
                        className="px-4 py-1 border border-gray-200 rounded-lg bg-white"
                      >
                        Man
                      </button>

                      <button
                        type="button"
                        className="px-4 py-1 border border-gray-200 rounded-lg bg-white"
                      >
                        Trans Person
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-normal">
                      Married? (Optional)
                    </label>

                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        className="px-4 py-1 border border-gray-200 rounded-lg bg-white"
                      >
                        Yes
                      </button>

                      <button
                        type="button"
                        className="px-4 py-1 border border-gray-200 rounded-lg bg-white"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Booking History */}
          {isBookingTab && <BookingHistory />}
        </div>
      </div>
    </>
  );
};

export default Profile;