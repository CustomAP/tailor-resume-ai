import { useEffect, useState } from "react";
import { ExperienceItem } from "../ExperienceItem";
import { storage } from "webextension-polyfill";
import { useNavigate } from "react-router-dom";

interface Experience {
  id: number;
  company: string;
  experience: string;
}

export const ExperienceForm = () => {
  let navigate = useNavigate();
  let [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    storage.local.get("experiences").then((data) => {
      if (data.experiences && data.experiences.length > 0) {
        deleteExperience();
        data.experiences.forEach((element: any) => {
          addExperience(element.company, element.experience);
        });
      } else {
        addExperience("", "");
      }
    });
  }, []);

  const updateExperience = (
    id: number,
    newCompany: string,
    newExperience: string
  ) => {
    setExperiences((experiences) => {
      return experiences.map((experience) => {
        if (experience.id === id) {
          return {
            ...experience,
            company: newCompany,
            experience: newExperience,
          };
        }
        return experience;
      });
    });
  };

  const addExperience = (company: string, experience: string) => {
    const newExperience: Experience = {
      id: experiences.length,
      company: company,
      experience: experience,
    };
    setExperiences((experiences) => [...experiences, newExperience]);
  };

  const deleteExperience = () => {
    experiences = experiences.slice(0, -1);
    setExperiences(experiences);
  };

  const saveExperiences = () => {
    storage.local.set({ experiences: experiences });
  };

  return (
    <form id="experienceForm">
      <div className="container">
        <div id="experienceFields">
          {experiences.map((experience) => (
            <ExperienceItem
              key={experience.id}
              id={experience.id}
              company={experience.company}
              experience={experience.experience}
              updateExperience={updateExperience}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-3 me-3 mb-3"
          id="addExperience"
          onClick={() => addExperience("", "")}
        >
          Add Experience
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm mt-3 me-3 mb-3"
          id="removeLastExperience"
          style={
            experiences.length > 1
              ? { display: "inline-block" }
              : { display: "none" }
          }
          onClick={deleteExperience}
        >
          Delete Last Experience
        </button>
        <button
          type="button"
          className="btn btn-success btn-sm mt-3 mb-3"
          id="saveForm"
          onClick={saveExperiences}
        >
          Save
        </button>
      </div>
    </form>
  );
};
