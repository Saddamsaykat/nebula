import { useEffect, useState } from "react";
import { useGetProjectImageQuery } from "../redux/slice/imageAPi/imageApi";

export const useProjectImage = (projectId: string | undefined) => {
  const { data: projectImage, isLoading } = useGetProjectImageQuery(projectId || "", {
    skip: !projectId,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (projectImage) {
      setImageUrl(projectImage);
      
      return () => {};
    }
  }, [projectImage]);

  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `project-image/${projectId}`;
      link.click();
    }
  };

  return { imageUrl, isLoading, downloadImage };
};
