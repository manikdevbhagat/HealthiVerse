import React from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  {
    path: "",
    icon: <AiFillGithub className="group-hover:text-white w-6 h-8" />,
  },
  {
    path: "",
    icon: <RiLinkedinFill className="group-hover:text-white w-6 h-8" />,
  },
];

const quickLinks1 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const quickLinks2 = [
  {
    path: "/gyms",
    display: "Find a Gym",
  },
  {
    path: "/trainers",
    display: "Find a Trainer",
  },
  {
    path: "/dieticians",
    display: "Find a Dietician",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img className="w-[150px] lg:w-[200px]" src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400] text-textColor">
              Copyright © {year} developed by Manik all rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link to={link.path} key={index}>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-[100px] justify-between">
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks1.map((item, index) => (
                <li className="mb-4" key={index}>
                  <Link
                    className="text-[16px] leading-7 font-[400] text-textColor "
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Services:
            </h2>
            <ul>
              {quickLinks2.map((item, index) => (
                <li className="mb-4" key={index}>
                  <Link
                    className="text-[16px] leading-7 font-[400] text-textColor "
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
