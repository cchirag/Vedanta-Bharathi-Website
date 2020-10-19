import React, { useState } from "react";
import { Bounce } from "react-activity";
import HeaderComponent from "../Components/Header.component";
import { firestore } from "../Services/firebase.service";
import firebase from "firebase/app";

export default function AddLinkPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const addLink = async () => {
    setSubmitted(true);
    await firestore
      .collection("audioVideoLinks")
      .doc("links")
      .update({
        links: firebase.firestore.FieldValue.arrayUnion({
          link: link,
          title: title,
        }),
      })
      .then(() => {
        setTitle("");
        setLink("");
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
                  Add Link
                </h1>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Event Title"
                      disabled={submitted}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="button is-success is-fullwidth"
                  disabled={submitted}
                  onClick={addLink}
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
