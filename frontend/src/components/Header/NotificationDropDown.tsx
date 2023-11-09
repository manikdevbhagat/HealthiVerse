import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { IoNotifications } from "react-icons/io5";
import { setCurrentChat } from "../../features/slices/chat/currentChatSlice";
import { Notification } from "../../models";
import { clearNotification } from "../../features/slices/notification/notificationSlice";

const NotificationDropDown = () => {
  const { notifications } = useAppSelector((state) => state.notifications);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const startChat = (item: Notification) => {
    dispatch(setCurrentChat(item.chat));
    dispatch(clearNotification(item));
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [showMenu]);

  //create a function in your component to handleOutsideClicks
  const handleOutsideClicks = ({ target }: MouseEvent) => {
    if (
      showMenu &&
      menuRef.current &&
      !menuRef.current?.contains(target as Node)
    ) {
      setShowMenu(false);
    }
  };

  return (
    <div ref={menuRef} className="relative z-10 inline-block text-left">
      <div className="flex items-center h-8 w-8">
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="relative inline-flex items-center p-3 text-sm font-medium text-center "
        >
          <IoNotifications className="h-[25px] w-[25px]" />

          {notifications.length > 0 && (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 right-0">
              {notifications.length}
            </div>
          )}
        </button>
      </div>

      {showMenu && (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="absolute right-0 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {notifications.length === 0 && (
              <div className="block block px-4 text-md text-gray-700">
                <span>No new messages</span>
              </div>
            )}
            {notifications.length > 0 &&
              notifications.map((item, index) => (
                <Link
                  to="/chats"
                  key={index}
                  onClick={() => startChat(item)}
                  className="block block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span>
                    New message from <span>{item.sender.senderData.name}</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropDown;