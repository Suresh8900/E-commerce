import React, { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    };

    const handleOffline = () => handleStatusChange(false);
    const handleOnline = () => handleStatusChange(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div>
      {showMessage && (
        <h3
          className={`transition-opacity duration-500 ease-in-out ${
            showMessage ? "opacity-100" : "opacity-0"
          } ${
            isOnline ? "bg-green-600" : "bg-red-600"
          } text-white text-center text-[14px] font-body`}
        >
          <span className="bg-white w-2 h-2 rounded-full inline-block mr-2"></span>
          {isOnline ? "You are back online." : "You are now offline."}
        </h3>
      )}
    </div>
  );
};

export default NetworkStatus;
