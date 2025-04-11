const SettingTableHead = () => {
    return (
        <thead className="border">
        <tr className="text-left">
          <th className="p-3 border-r-2">Image</th>
          <th className="p-3 border-r-2">Student ID</th>
          <th className="p-3 border-r-2">Name</th>
          <th className="p-3 border-r-2">Batch</th>
          <th className="p-3 border-r-2">Department</th>
          <th className="p-3 border-r-2 max-w-[100px]">Email</th>
          <th className="p-3 border-r-2">Gender</th>
          <th className="p-3 border-r-2">Country</th>
          <th className="p-3 border-r-2">City</th>
          <th className="p-3 border-r-2">Role</th>
          <th className="p-3 border-r-2">Update</th>
          <th className="p-3 border-r-2">User View</th>
        </tr>
      </thead>
    );
};

export default SettingTableHead;