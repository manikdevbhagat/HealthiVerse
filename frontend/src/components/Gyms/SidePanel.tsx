import React, { useState } from "react";

const SidePanel = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="shadow-2xl border border-solid border-gray-400 p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Membership Price</p>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 py-2 border-y border-solid border-gray-400">
            <input
              type="radio"
              value="option1"
              checked={selectedOption === "option1"}
              onChange={handleOptionChange}
            />
            <div className="flex flex-1 justify-between">
              <p>Option 1</p>
              <p>₹ 1000</p>
            </div>
          </div>

          <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
            <input
              type="radio"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
            />
            <div className="flex flex-1 justify-between">
              <p>Option 2</p>
              <p>₹ 3000</p>
            </div>
          </div>

          <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
            <input
              type="radio"
              value="option3"
              checked={selectedOption === "option3"}
              onChange={handleOptionChange}
            />
            <div className="flex flex-1 justify-between">
              <p>Option 3</p>
              <p>₹ 6000</p>
            </div>
          </div>

          <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
            <input
              type="radio"
              value="option4"
              checked={selectedOption === "option4"}
              onChange={handleOptionChange}
            />
            <div className="flex flex-1 justify-between">
              <p>Option 4</p>
              <p>₹ 12000</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn">
              Buy Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SidePanel;
