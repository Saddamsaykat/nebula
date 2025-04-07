import { useCallback } from 'react';
import { useGetProjectImageQuery } from '../redux/slice/imageAPi/imageApi';

const useDownloadImage = (projectId: string) => {
  const { data: imageUrl, isLoading, isError } = useGetProjectImageQuery(projectId, {
    skip: !projectId,
  });

  const downloadImage = useCallback(() => {
    if (!imageUrl) return;

    // Create a link element for downloading the image
    const link = document.createElement('a');
    link.href = imageUrl; // Use the object URL of the Blob
    link.download = `project-image-${projectId}`; // Name of the downloaded file
    link.click(); // Trigger the download
  }, [imageUrl, projectId]);

  return {
    downloadImage,
    isLoading,
    isError,
  };
};

export default useDownloadImage;
