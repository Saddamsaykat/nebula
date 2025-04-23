interface Student {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
}

interface Batch {
  batch: string;
  department: {
    [departmentName: string]: Student[];
  };
}

// export const filterData = (
//   data: Batch[],
//   selectedBatch: string | null,
//   selectedDepartment: string | null,
//   searchTerm: string
// ): Batch[] => {
//   return data.filter((batch) => {
//     const isBatchMatch = !selectedBatch || batch.batch === selectedBatch;

//     const isDeptMatch =
//       !selectedDepartment ||
//       (typeof batch.department === "object" &&
//         selectedDepartment in batch.department);

//     const isSearchMatch =
//       !searchTerm ||
//       Object.values(batch.department || {}).some(
//         (students) =>
//           Array.isArray(students) &&
//           students.some((student) =>
//             [
//               `${student.firstName} ${student.lastName}`,
//               batch.batch,
//               ...Object.keys(batch.department || {}),
//               student?.number,
//               student?.email,
//             ].some((field) =>
//               field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//               // console.log(
//               //   field
//               //     ?.toString()
//               //     .toLowerCase()
//               //     .includes(searchTerm.toLowerCase())
//               // )
//             )
//           )
//       );
//     return isBatchMatch && isDeptMatch && isSearchMatch;
//   });
// };



export const filterData = (
  data: Batch[],
  selectedBatch: string,
  selectedDepartment: string,
  searchTerm: string
): Batch[] => {
  return data
    .filter((batch) => {
      const isBatchMatch = !selectedBatch || batch.batch === selectedBatch;
      const isDeptMatch =
        !selectedDepartment || selectedDepartment in (batch.department || {});
      return isBatchMatch && isDeptMatch;
    })
    .map((batch) => {
      const filteredDepartments: Batch["department"] = {};

      for (const [dept, students] of Object.entries(batch.department || {})) {
        // Apply department filter
        if (selectedDepartment && dept !== selectedDepartment) continue;

        // Apply name search filter
        const filteredStudents = students.filter((student) => {
          const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase());
        });

        if (filteredStudents.length > 0) {
          filteredDepartments[dept] = filteredStudents;
        }
      }

      return {
        ...batch,
        department: filteredDepartments,
      };
    })
    .filter((batch) => Object.keys(batch.department).length > 0); // Only keep batches with matched departments
};
