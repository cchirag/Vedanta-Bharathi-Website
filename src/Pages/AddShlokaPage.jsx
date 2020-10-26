import React, { useEffect, useState } from "react";
import { firestore } from "../Services/firebase.service";
import HeaderComponent from "../Components/Header.component";
import { Bounce } from "react-activity";

export default function AddShlokaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState();
  const [order, setOrder] = useState(0);
  const [kannadaCategory, setKannadaCategory] = useState(
    "Select Kannada Category"
  );
  const [sanskritCategory, setSanskritCategory] = useState(
    "Select Sanskrit Category"
  );
  const [kannadaTitle, setKannadaTitle] = useState("");
  const [sanskritTitle, setSanskritTitle] = useState("");
  const [kannadaData, setKannadaData] = useState("");
  const [sanskritData, setSanskritData] = useState("");

  const handleAdd = async () => {
    setSubmitted(true);
    await firestore
      .collection("shloka")
      .add({
        id: "",
        order: Number(order),
        kannadaCategory: kannadaCategory  ,
        sanskritCategory: sanskritCategory,
        kannadaTitle: kannadaTitle,
        sanskritTitle: sanskritTitle,
        kannadaData: kannadaData,
        sanskritData: sanskritData,
      })
      .then(async (doc) => {
        await firestore
          .collection("shloka")
          .doc(doc.id)
          .update({
            id: doc.id,
          })
          .catch((err) => {
            alert(err);
          });
        setSubmitted(false);
      })
      .then(() => {
        setOrder(0);
        setKannadaCategory("Select Kannada Category");
        setSanskritCategory("Select Sanskrit Category");
        setKannadaTitle("");
        setSanskritTitle("");
        setKannadaData("");
        setSanskritData("");
      })
      .catch((error) => {
        alert(error);
        setSubmitted(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    const getCategories = async () => {
      await firestore
        .collection("categories")
        .doc("categories")
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            if (isMounted) {
              setCategories(snapshot.data());
            }
          }
        });
    };

    getCategories();

    return () => {
      isMounted = false;
    };
  }, []);

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
                  Add Shloka
                </h1>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      placeholder="Order"
                      value={order}
                      onChange={(e) => {
                        setOrder(e.target.value);
                      }}
                      disabled={submitted}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="select">
                    <select
                      onChange={(e) => {
                        setKannadaCategory(e.target.value);
                      }}
                      value={kannadaCategory}
                      disabled={submitted}
                    >
                      <option>Select Kannada Category</option>
                      {categories !== undefined
                        ? categories.kannadaCategories.map(
                            (kannadaCategory) => {
                              return (
                                <option key={kannadaCategory}>
                                  {kannadaCategory}
                                </option>
                              );
                            }
                          )
                        : null}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="select">
                    <select
                      onChange={(e) => {
                        setSanskritCategory(e.target.value);
                      }}
                      value={sanskritCategory}
                      disabled={submitted}
                    >
                      <option>Select Sanskrit Category</option>
                      {categories !== undefined
                        ? categories.sanskritCategories.map(
                            (sanskritCategory) => {
                              return (
                                <option key={sanskritCategory}>
                                  {sanskritCategory}
                                </option>
                              );
                            }
                          )
                        : null}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Kannada Title"
                      value={kannadaTitle}
                      onChange={(e) => {
                        setKannadaTitle(e.target.value);
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
                      placeholder="Sanskrit Title"
                      value={sanskritTitle}
                      onChange={(e) => {
                        setSanskritTitle(e.target.value);
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
                      placeholder="Kannada Shloka"
                      value={kannadaData}
                      onChange={(e) => {
                        setKannadaData(e.target.value);
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
                      placeholder="Sanskrit Shloka"
                      value={sanskritData}
                      onChange={(e) => {
                        setSanskritData(e.target.value);
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
