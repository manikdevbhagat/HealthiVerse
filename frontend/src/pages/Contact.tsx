import React, { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  role: string;
}

const Contact = () => {
  const emptyForm = {
    name: "",
    email: "",
    message: "",
    role: "",
  };
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setFormData(emptyForm);
  };

  return (
    <>
      <section className="">
        <div className="px-4 mx-auto max-w-screen-md">
          <h2 className="heading text-center ">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text__para">
            Share your details and get a callback from our team
          </p>
          <form className="shadow-xl bg-gray-800 p-8 rounded-xl border border-gray-400" onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center justify-between">
              <label
                htmlFor=""
                className="text-white font-bold text-[16px] leading-7"
              >
                I am a:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 ml-8 px-4 py-3
                  focus:outline-none rounded-lg border-b border-gray-600"
                >
                  <option value="client">Client</option>
                  <option value="gym">Gym Owner</option>
                  <option value="trainer">Trainer</option>
                  <option value="dietician">Dietician</option>
                </select>
              </label>
            </div>
            <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <BiSolidUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className=" rounded-r-lg flex-1 appearance-none 
                    border border-gray-300 w-full py-3 px-4 bg-white 
                    text-gray-700 placeholder-gray-400 shadow-sm text-base 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdEmail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className=" rounded-r-lg flex-1 appearance-none 
                    border border-gray-300 w-full py-3 px-4 bg-white 
                    text-gray-700 placeholder-gray-400 shadow-sm text-base 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="border border-solid border-blue-800 focus-outline 
              outline-primaryColor w-full px-4 py-3 rounded-md"
              rows={5}
              placeholder="Write your message"
            />
            <div className="flex justify-center">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
