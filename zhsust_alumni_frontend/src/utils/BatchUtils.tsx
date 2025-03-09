const batch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

// Dropdown from the batch

const BatchUtils = ({ handleChange, selectedBatch }) => {
  return (
    <div className="">
            <label htmlFor="batch">Batch</label>
      <select
      id="batch"
        onChange={handleChange}
        value={selectedBatch}
        className="border-2 border-gray-400 p-2 rounded-md w-full"
      >
        <option value="">Batch</option>
        {batch?.map((b) => (
          <option key={b} value={b}>
            Batch {b}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BatchUtils;