import React, { useState } from "react";
import axios from "axios";
import Message from "./../../components/Message";
import "./style.scss";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post(`/api/messages`, { name, email, message }, config);
    alert("Message sent successfully");
    setName("");
    setEmail("");
    setMessage("");
  };
  console.log(error.length);

  return (
    <main className="flexbox-col">
      <h1 className=" display-1 text-center text-white " id="heading-about">
        Contacts <hr className="hr" />
      </h1>

      <div className="contacts">
        <p>Phone:48357349857498</p>
        <br></br>
        <p>Email: abc@abc.com</p>
      </div>

      <div className="form-wrapper">
        <form id="form" onSubmit={submitHandler}>
          <p className="form-undertitle">Fields marked "*" are required.</p>
          <div className="form-input-grid">
            <div>
              <p className="form-text">Name*</p>
              <div className="form-input-wrapper flexbox-left">
                <i className="uil uil-user" />
                <input
                  className="form-input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-input-max">
              <p className="form-text">Email*</p>
              <div className="form-input-wrapper flexbox-left">
                <i className="uil uil-at" />
                <input
                  className="form-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-input-max">
            <p className="form-text">Message* (Max 500)</p>
            <div
              id="textarea"
              className="form-input-wrapper flexbox-left-start"
            >
              <i className="uil uil-comment-dots" />
              <textarea
                className="form-input"
                id="message"
                name="message"
                placeholder="Your message"
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-input-max flexbox-left">
            <div className="my-5 w-25">
              <button className="button" type="submit">
                Send your message
              </button>
            </div>
          </div>
          {error.length > 0 && <Message variant="success">{error}</Message>}
        </form>
      </div>
    </main>
  );
};

export default Contact;
