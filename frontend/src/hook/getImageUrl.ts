import { useEffect, useState } from "react";
import { useGetProjectImageQuery } from "../redux/slice/imageAPi/imageApi";

export const useProjectImage = (projectId: string | undefined) => {
  const { data: projectImage, isLoading } = useGetProjectImageQuery(
    projectId || "",
    {
      skip: !projectId,
    }
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!projectImage) return;
  
    const url = projectImage;
    setImageUrl(url);
  
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [projectImage]);
  


  return { imageUrl, isLoading };
};
