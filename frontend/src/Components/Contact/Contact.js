import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

 // Adjust the path based on your project structure




// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_19nyetl",
        "template_xmf9zrc",
        form.current,
        "n5lD8nKov_uf9-TOt"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="c-bd">
   
    <StyledContactForm >
    
    <form className="c-form" ref={form} onSubmit={sendEmail}>
    <h3>Contact Us</h3>
    <label>Name</label>
    <input className="c-input" type="text" name="to_name" />
    <label className="c-lab" >Email</label>
    <input type="email" name="from_email" />
    <label>Message</label>
    <textarea className="c-ta" name="message" />
    <input className="c-sub" type="submit" value="Send" />
  </form>
    </StyledContactForm>
    </div>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  .c-form {
    margin-top:40px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    padding-top: 100px;

    .c-input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      color:blue;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    .c-ta {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    .c-lab {
      margin-top: 1rem;
    }

    .c-sub {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;