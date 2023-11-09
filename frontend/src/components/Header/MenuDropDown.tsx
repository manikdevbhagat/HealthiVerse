import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxhooks";

const MenuDropDown = () => {
  const { user, token, role } = useAppSelector((state) => state.login);
  const { userProfile } = useAppSelector((state) => state.userProfile);
  const {gymProfile} = useAppSelector(state=>state.gymProfile);
  const {trainerProfile} = useAppSelector(state=>state.trainerProfile);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const roleLinks = {
    client: "/users",
    gym: "/gyms",
    trainer: "/trainers",
    dietician: "/dieticians",
  };

  const menuItems = [
    { text: "Profile", link: role ? roleLinks[role] + "/profile/me" : "/" },
    {
      text: "Memberships",
      link: role ? roleLinks[role] + "/memberships/my-memberships" : "/",
    },
    { text: "Chats", link: "/chats" },
  ];

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

  const getImageSrc = ()=>{
    const roleProfileMap = {
      "client": userProfile,
      "gym": gymProfile,
      "trainer": trainerProfile,
      "dietician":null
    }
    const profile = role?roleProfileMap[role]:null;
    return profile?profile.photo: user?.photo;
  }

  return (
    <div ref={menuRef} className="relative z-10 inline-block text-left">
      <div className="flex items-center">
        <button onClick={() => setShowMenu(!showMenu)}>
          <img
            src={getImageSrc()}
            alt="user image"
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
          />
        </button>
      </div>
      {showMenu && (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className="block block px-4 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="flex flex-col">
                  <span>{item.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropDown;