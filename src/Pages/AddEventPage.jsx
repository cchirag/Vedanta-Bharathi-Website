import React, { useState } from "react";
import { Bounce } from "react-activity";
import HeaderComponent from "../Components/Header.component";
import { firestore } from "../Services/firebase.service";
import firebase from "firebase/app";

export default function AddEventPage() {
  const [submitted, setSubmitted] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventData, setEventData] = useState("");
  const addEvent = async () => {
    setSubmitted(true);

    await firestore
      .collection("events")
      .doc("events")
      .update({
        events: firebase.firestore.FieldValue.arrayUnion({
          data: eventData,
          title: eventTitle,
        }),
      })
      .then(() => {
        setEventTitle("");
        setEventData("");
        setSubmitted(false);
      })
      .catch((err) => {
        console.log(err);
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
                  Add Events
                </h1>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Event Title"
                      disabled={submitted}
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Event Data"
                      disabled={submitted}
                      value={eventData}
                      onChange={(e) => setEventData(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="button is-success is-fullwidth"
                  disabled={submitted}
                  onClick={addEvent}
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
