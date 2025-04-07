/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useGetPostsQuery } from "../redux/slice/postData/postDataSlice";

const useUserDetails = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { data } = useGetPostsQuery();
  const userEmail = user?.email;

  const userInfo = useMemo(() => {
    if (!data || !userEmail) return null;

    for (const batchData of data) {
      if (
        typeof batchData?.department === "object" &&
        batchData?.department !== null
      ) {
        for (const department in batchData.department as Record<string, any>) {
          const users = batchData.department[department] as any[];
          const matchedUser = users?.find(
            (user: any) => user.email === userEmail
          );

          if (matchedUser) {
            return {
              batch: batchData.batch,
              department,
              student: matchedUser,
            };
          }
        }
      }
    }

    return null;
  }, [data, userEmail]);

  return { userInfo, userEmail };
};

export default useUserDetails;