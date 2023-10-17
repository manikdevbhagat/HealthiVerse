import React, { useState } from "react";

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
          <form className="shadow-xl bg-gray-100 p-8 rounded-xl border border-gray-400" onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center justify-between">
              <label
                htmlFor=""
                className="text-headingColor font-bold text-[16px] leading-7"
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
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mb-8  border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mb-8 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
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
