import { useState } from "react";

import "./App.css";

const formConfig = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    minLength: 6,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: false,
    min: 0,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select Gender" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "subscribe",
    label: "Subscribe to newsletter",
    type: "checkbox",
    required: false,
  },
];

function App() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const value = field.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field.name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    formConfig.forEach((field) => {
      const value = formData[field.name];
      if (field.required) {
        if (
          (field.type === "checkbox" && !value) ||
          (field.type !== "checkbox" && !value)
        ) {
          newErrors[field.name] = "This field is required";
        }
      }
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email address";
        }
      }
      if (field.type === "password" && value) {
        if (field.minLength && value.length < field.minLength) {
          newErrors[
            field.name
          ] = `Password must be at least ${field.minLength} characters`;
        }
      }
      if (field.type === "number" && value) {
        if (field.min !== undefined && Number(value) < field.min) {
          newErrors[field.name] = `Minimum value is ${field.min}`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted: " + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {formConfig.map((field) => {
        return (
          <div key={field.name} style={{ marginBottom: "1em" }}>
            <label htmlFor="">
              {field.label}
              {field.required && "*"}
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field)}
                >
                  {field.options.map((opt) => {
                    return (
                      <option value={opt.value} key={opt.value}>
                        {opt.label}
                      </option>
                    );
                  })}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field)}
                  min={field.min}
                />
              )}
            </label>
            {errors[field.name] && (
              <div style={{ color: "red" }}>{errors[field.name]}</div>
            )}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
