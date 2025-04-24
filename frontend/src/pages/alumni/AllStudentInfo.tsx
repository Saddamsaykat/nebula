/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../../redux/slice/postData/postDataSlice";
import { Link } from "react-router-dom";

const AllStudentInfo = () => {
  const { data, isLoading, isError } = useGetPostsQuery();
  const [visibleStudents, setVisibleStudents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement | null>(null);

  const STUDENTS_PER_PAGE = 9; // 3 per row × 3 rows per scroll

  // Flatten all students from all batches & departments
  const getAllStudents = () => {
    if (!data) return [];
    return data.flatMap((batch: any) =>
      Object.values(batch.department).flat()
    );
  };

  const allStudents = getAllStudents();

  // Load students based on the current page
  useEffect(() => {
    const nextChunk = allStudents.slice(0, page * STUDENTS_PER_PAGE);
    setVisibleStudents(nextChunk);
  }, [page, data]);

  // Infinite scroll setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleStudents.length < allStudents.length) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" } // preload just before reaching
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [allStudents.length, visibleStudents.length]);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-40 rounded-lg shadow-md"
          ></div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) return <div className="text-red-500 p-4">Failed to load data</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {visibleStudents.map((student, idx) => (
        <Link
          key={idx}
          to={`/alumni-students/${student?.studentId}`}
          className="p-4"
        >
          <div className="bg-white rounded-xl shadow-md p-4 hover:scale-[1.02] transition-all duration-300 border hover:border-indigo-400">
            <h2 className="font-bold text-lg mb-1 text-yellow-500">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-sm text-gray-700 mb-1">📧 {student.email}</p>
            <p className="text-sm text-gray-700 mb-1">📱 {student.number}</p>
            <p className="text-sm text-gray-700 mb-1">
              🏠 Present: {student.presentAddress}
            </p>
            <p className="text-sm text-gray-700">
              🏡 Permanent: {student.permanentAddress}
            </p>
          </div>
        </Link>
      ))}

      {/* Loader */}
      <div ref={loader} className="h-12 mt-6 flex justify-center items-center">
        {visibleStudents.length < allStudents.length ? (
          <span className="text-gray-500 animate-pulse">Loading more...</span>
        ) : (
          <span className="text-gray-400">No more students</span>
        )}
      </div>
    </div>
  );
};

export default AllStudentInfo;
