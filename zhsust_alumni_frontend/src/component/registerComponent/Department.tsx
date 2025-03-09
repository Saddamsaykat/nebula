const department = ["CSE", "EEE", "BBA", "CE", "CHE", "LAW", "ENGLISH"];

const Department = ({ handleChange, selectedDepartment }) => {
  return (
    <div className="w-full">
      <label htmlFor="department">Department</label>
      <select
        id="department"
        value={selectedDepartment}
        onChange={handleChange}
        className="border-2 border-gray-400 p-2 rounded-md w-full"
      >
        <option value="">Select Department</option>
        {department.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Department;
