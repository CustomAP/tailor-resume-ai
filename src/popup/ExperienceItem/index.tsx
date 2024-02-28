import { useState } from "react";

export const ExperienceItem = (props: any) => {
  let [company, setCompany] = useState(props.company);
  let [experience, setExperience] = useState(props.experience);

  const handleChange = () => {
    props.updateExperience(props.id, company, experience);
  };

  return (
    <div>
      <div className="form-group mt-3">
        <input
          type="email"
          className="form-control form-control-sm exp-name"
          placeholder="Company Name"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onBlur={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <textarea
          className="form-control form-control-sm exp-content"
          rows={3}
          name="experience"
          placeholder="1. Designed a webpage for the company
2. Designed an app for the company"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          onBlur={handleChange}
        />
      </div>
    </div>
  );
};
