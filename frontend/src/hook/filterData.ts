interface Student {
    name: string;
    number: string;
    email: string;
  }
  
  interface Batch {
    batch: string;
    department: {
      [departmentName: string]: Student[];
    };
  }
  
  export const filterData = (
    data: Batch[],
    selectedBatch: string | null,
    selectedDepartment: string | null,
    searchTerm: string
  ): Batch[] => {
    return data.filter((batch) => {
      const isBatchMatch = !selectedBatch || batch.batch === selectedBatch;
  
      const isDeptMatch =
        !selectedDepartment ||
        (typeof batch.department === 'object' &&
          selectedDepartment in batch.department);
  
      const isSearchMatch =
        !searchTerm ||
        Object.values(batch.department || {}).some(
          (students) =>
            Array.isArray(students) &&
            students.some((student) =>
              [
                batch.batch,
                ...Object.keys(batch.department || {}),
                student.name,
                student.number,
                student.email,
              ].some((field) =>
                field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
        );
  
      return isBatchMatch && isDeptMatch && isSearchMatch;
    });
  };
  