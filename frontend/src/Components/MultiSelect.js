import React, { useState } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const MultiSelect = () => {
  const [formData, setFormData] = useState({
    skillsRequired: []
  });

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      skillsRequired: selectedSkills
    }));
  };

  return (
    <ReactMultiSelectCheckboxes
      id="skillsRequired"
      name="skillsRequired"
      options={[
        { label: "JavaScript", value: "JavaScript" },
        { label: "React", value: "React" },
        { label: "Node.js", value: "Node.js" }
        // Add more skills here
      ]}
      selectedValues={formData.skillsRequired}
      onSelect={handleSkillsChange}
      onRemove={handleSkillsChange}
    />
  );
};

export default MultiSelect;
