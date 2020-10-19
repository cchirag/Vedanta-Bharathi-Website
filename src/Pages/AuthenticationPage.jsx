import React, { useEffect, useState } from "react";
import { logIn } from "../Services/firebase.service";
import { Bounce } from "react-activity";


export default function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      setSubmitted(false);
    };
  }, []);

  const handleSubmit = () => {
      setSubmitted(true)
    logIn(email, password);
  };
  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Vedanta Bharathi</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns is-mobile is-centered">
          <div
            className="column has-background-link is-three-quarters-mobile is-half-desktop"
            style={{ paddingTop: "3%", paddingBottom: "3%" }}
          >
            <div className="columns is-mobile is-centered">
              <div className="column is-half">
                <h1 className="title has-text-white has-text-centered">
                  Login
                </h1>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <button
                  className="button is-success is-fullwidth"
                  onClick={handleSubmit}
                >
                  {submitted ? <Bounce color="white"></Bounce> : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
