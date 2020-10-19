import React, { useState } from "react";
import { Bounce } from "react-activity";
import HeaderComponent from "../Components/Header.component";
import { firestore } from "../Services/firebase.service";

export default function AddThoughtOfTheDayPage() {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [kannadaThought, setKannadaThought] = useState("");
  const [sanskritThought, setSanskritThought] = useState("");

  const handleAdd = async () => {
    setSubmitted(true);
    await firestore
      .collection("messageOfTheDay")
      .add({
        date: finalDate,
        kannadaMessage: kannadaThought,
        sanskritMessage: sanskritThought,
      })
      .then(() => {
        setSubmitted(false);
        setFinalDate("");
        setDate("");
        setKannadaThought("");
        setSanskritThought("");
      })
      .catch((error) => {
        console.log(error);
        setSubmitted(false);
      });
  };
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <section className="section">
        <div className="columns is-mobile is-centered">
          <div
            className="column has-background-link is-three-quarters-mobile is-half-desktop"
            style={{ paddingTop: "3%", paddingBottom: "3%" }}
          >
            <div className="columns is-mobile is-centered">
              <div className="column is-half">
                <h1 className="title has-text-white has-text-centered">
                  Add Thought Of The Day
                </h1>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      placeholder="Date"
                      onChange={(e) => {
                        setDate(e.target.value);
                        setFinalDate(e.target.valueAsDate.toDateString());
                      }}
                      value={date}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Thought of The Day (Kannada)"
                      value={kannadaThought}
                      onChange={(e) => {
                        setKannadaThought(e.target.value);
                      }}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Thought of The Day (Sanskrit)"
                      value={sanskritThought}
                      onChange={(e) => {
                        setSanskritThought(e.target.value);
                      }}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <button
                  className="button is-success is-fullwidth"
                  onClick={handleAdd}
                  disabled={submitted}
                >
                  {submitted ? <Bounce color="white"></Bounce> : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
