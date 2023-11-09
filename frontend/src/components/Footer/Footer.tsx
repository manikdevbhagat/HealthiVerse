import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_2.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  {
    path: "",
    icon: <AiFillGithub className=" text-gray-800 hover:text-black w-6 h-8" />,
  },
  {
    path: "",
    icon: <RiLinkedinFill className="text-gray-800 hover:text-black w-6 h-8" />,
  },
];

const quickLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {

  return (
    <footer className="footer pt-8 pb-4">
      <div className="container">
        <div className="flex justify-around flex-col md:flex-row flex-wrap gap-[30px]">
          
          <div className="flex flex-row justify-between">
          <div className="w-[150px] lg:w-[200px]">
            <ul>
              {quickLinks.map((item, index) => (
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
          <div>
          <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link to={link.path} key={index}>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <img className="w-[150px] lg:w-[200px]" src={logo} alt="" />
            
            
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
