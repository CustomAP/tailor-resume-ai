import { useState } from "react";
import { useEffect } from "react";
import { storage } from "webextension-polyfill";

export const Dialog = () => {
  let [tailoredResume, setTailoredResume] = useState();
  let [errorResponse, setErrorRespones] = useState();
  let [loading, setLoading] = useState(true);

  const getExperiences = async () => {
    return await storage.local.get("experiences");
  };

  const getSelectionText = async () => {
    return await storage.local.get("selectionText");
  };

  const fetchTailoredResume = async (experiences: any, selectionText: any) => {
    const postData = {
      experiences: experiences,
      jobDescription: selectionText,
    };

    let response = await fetch(
      "https://e4vnu9b046.execute-api.us-east-2.amazonaws.com/prod/tailorResumeForJD",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    setLoading(false);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  useEffect(() => {
    getExperiences().then((experienceData) => {
      getSelectionText().then((selectionData) => {
        fetchTailoredResume(
          experienceData.experiences,
          selectionData.selectionText
        )
          .then((result) => {
            setTailoredResume(JSON.parse(result.body).skills);
          })
          .catch((error) => {
            setLoading(false);
            setErrorRespones(error);
          });
      });
    });
  }, []);

  return (
    <div className="card border-light mb-3 mt-4 ms-3">
      <div className="card-header">ResumeTailor.AI</div>
      <div className="card-body">
        <h5 className="card-title">Your customized Resume</h5>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : null}
        {errorResponse ? (
          <div className="alert alert-danger" role="alert">
            Failed to communicate with the server
          </div>
        ) : null}
        {tailoredResume ? <p className="card-text">{tailoredResume}</p> : null}
      </div>
    </div>
  );
};
