import { useState } from "react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    batch: "",
    department: "",
    name: "",
    email: "",
    number: "",
    presentAddress: "",
    permanentAddress: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      alert("Student added successfully!");
      setFormData({
        batch: "",
        department: "",
        name: "",
        email: "",
        number: "",
        presentAddress: "",
        permanentAddress: "",
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="batch" placeholder="Batch" value={formData.batch} onChange={handleChange} className="w-full p-2 border" required />
        
        <select name="department" value={formData.department} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Department</option>
          <option value="EEE">EEE</option>
          <option value="CSE">CSE</option>
        </select>

        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="number" placeholder="Number" value={formData.number} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="presentAddress" placeholder="Present Address" value={formData.presentAddress} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} className="w-full p-2 border" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
