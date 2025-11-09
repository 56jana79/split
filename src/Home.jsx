import React, { useState } from "react";
import "./Home.css";
import ShareButton from "./ShareButton";

const Home = () => {
  const [person1, setperson] = useState([]);
  const [data, setdata] = useState("");
  const [number, setnumber] = useState(0);
  const [total, settotal] = useState(0);
  const [boolean, setboolean] = useState(false);

  const adder = () => {
    if (data.trim() !== "" && !/^[0-9]+$/.test(data)) {
      setperson((newperson1) => [...newperson1, data.trim()]);
      setdata("");
    } else {
      alert("Please enter a valid name (not just numbers)");
    }
  };

  const del = (index) => {
    setperson(person1.filter((_, i) => i !== index));
  };

  const check = () => {
    if (person1.length > 0) {
      const divide = Math.floor(total / person1.length);
      setnumber(divide);
      setboolean(true);
    } else {
      alert("Please add at least one member before dividing!");
    }
  };

  const reset = () => {
    setperson([]);
    setdata("");
    setnumber(0);
    settotal(0);
    setboolean(false);
  };

  return (
    <div>
      <h1>S-p-l-i-t</h1>

      <div className="usercontainer">
        <input
          className="userinput"
          value={data}
          type="text"
          placeholder="Enter member name"
          onChange={(e) => setdata(e.target.value)}
        />
        <br />
        <button onClick={adder}  style={{backgroundColor:"blue"}} >Add Member</button>
        <div className="gap">
          <div className="adder">
            {person1.map((item, index) => (
              <div key={index} className="member-item">
                <h4>{item}</h4>
                <button  style={{backgroundColor:"red"}} onClick={() => del(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-container">
        <h3>Enter the Total Amount</h3>
        <input
        className="inputholder"
          type="number"
          placeholder="Enter total amount"
          onChange={(e) => settotal(Number(e.target.value))}
        />
        <button onClick={check}>Check</button>

        <div id="split-result" className="split-main-container">
          {boolean &&
            person1.map((item, index) => (
              <div key={index} className="inner">
                <label>{item}</label>
                <h2>{number}</h2>
              </div>
            ))}
        </div>

        <button onClick={reset}>Reset</button>
        <ShareButton containerId="split-result" />
      </div>
    </div>
  );
};

export default Home;
