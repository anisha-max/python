import { useState } from "react";
import { createProject } from "../services/api";

function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00f2ad]"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 5,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00f2ad]"
      />
    </div>
  );
}

function FileUpload({ label, name, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">
        {label}
      </label>

      <input
        type="file"
        name={name}
        multiple
        onChange={onChange}
        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#00f2ad] file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-black file:font-semibold"
      />
    </div>
  );
}

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    role: "",
    duration: "",
    status: "",
    description: "",
    overview: "",
    problem: "",
    solution: "",
    architecture: "",
    challenges: "",
    performance: "",
    security: "",
    learnings: "",
    features: "",
    future_improvements: "",
    github_link: "",
    live_link: "",
    tech_stack: "",
    media_files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      media_files: Array.from(e.target.files),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "media_files") {
        value.forEach((file) => {
          data.append("media_files", file);
        });
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await createProject(data);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Create New Project
          </h1>

          <p className="text-[#00f2ad] text-lg">
            Add project details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          {/* BASIC INFO */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Uber Clone"
              />

              <Input
                label="Subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Real-time ride booking app"
              />

              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Full Stack Developer"
              />

              <Input
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="3 Months"
              />

              <Input
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Completed"
              />
            </div>
          </div>

          {/* CORE CONTENT */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-4">
              Core Content
            </h2>

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about your project..."
            />

            <TextArea
              label="Overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Project overview..."
            />

            <TextArea
              label="Problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="What problem were you solving?"
            />

            <TextArea
              label="Solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="How did you solve it?"
            />
          </div>

          {/* TECHNICAL DETAILS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-4">
              Technical Details
            </h2>

            <TextArea
              label="Architecture"
              name="architecture"
              value={formData.architecture}
              onChange={handleChange}
              placeholder="Explain architecture..."
            />

            <TextArea
              label="Challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Mention challenges..."
            />

            <TextArea
              label="Performance"
              name="performance"
              value={formData.performance}
              onChange={handleChange}
              placeholder="Performance optimizations..."
            />

            <TextArea
              label="Security"
              name="security"
              value={formData.security}
              onChange={handleChange}
              placeholder="Security implementations..."
            />

            <TextArea
              label="Learnings"
              name="learnings"
              value={formData.learnings}
              onChange={handleChange}
              placeholder="What did you learn?"
            />

            <TextArea
              label="Features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Comma separated features..."
            />

            <TextArea
              label="Future Improvements"
              name="future_improvements"
              value={formData.future_improvements}
              onChange={handleChange}
              placeholder="Future scope..."
            />
          </div>

          {/* LINKS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-4">
              Links & Media
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="GitHub Link"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />

              <Input
                label="Live Link"
                name="live_link"
                value={formData.live_link}
                onChange={handleChange}
                placeholder="https://yourapp.com"
              />

              <Input
                label="Tech Stack"
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleChange}
                placeholder="React, FastAPI, PostgreSQL"
              />

              <FileUpload
                label="Upload Media"
                name="media_files"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-6">
            <button
              type="submit"
              className="bg-[#00f2ad] text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}