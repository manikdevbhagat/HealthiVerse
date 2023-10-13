import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/gyms",
    display: "Find a Gym",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<typeof BiMenu>(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show__menu");
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/*Logo*/}
          <div>
            <img src={logo} alt="" className="max-w-max w-[150px] md:w-[200px] h-auto" />
          </div>
          {/*Menu*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          {/*nav right*/}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to={"/"}>
                <img
                  src={userImg}
                  alt="user image"
                  className="w-[35px] h-[35px] rounded-full cursor-pointer"
                />
              </Link>
            </div>
            <Link to={"/login"}>
              <button
                className="bg-primaryColor py-2 px-6 text-white font-[600] 
                h-[44px] flex items-center justify-center rounded-[50px]"
              >
                Login
              </button>
            </Link>

            <span className="md:hidden" onClick={toggleMenu}>
              {showMenu ? (
                <AiOutlineClose className="w-6 h-6 cursor-pointer relative z-50" />
              ) : (
                <BiMenu className="w-6 h-6 cursor-pointer" />
              )}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
