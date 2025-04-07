import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useUploadImageMutation } from "../redux/slice/imageAPi/imageApi";

const useImageUpload = (defaultImage: string) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [uploadImageMutation] = useUploadImageMutation();

  const compressImage = async (image: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.1, // 100 KB maximum size
      maxWidthOrHeight: 800, // Optional: You can resize the image if needed
      useWebWorker: true,
      initialQuality: 0.5, // Start with a quality of 50% (can be adjusted)
    };

    let compressedFile = image;
    try {
      compressedFile = await imageCompression(image, options);
      
      // Check if the file size is within the desired limit (100KB)
      if (compressedFile.size > 100 * 1024) {
        // If the file is too large, try reducing quality further or resizing
        options.initialQuality = 0.3; // Reduce quality further
        compressedFile = await imageCompression(image, options);
      }
      
      // Ensure that the file is now under the size limit
      if (compressedFile.size > 100 * 1024) {
        throw new Error("Image compression failed to meet the 100KB size requirement.");
      }
      
      return compressedFile;
    } catch (error) {
      console.error("Image compression failed:", error);
      throw new Error("Image compression failed.");
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    try {
      const compressedImage = await compressImage(image);
      const formData = new FormData();
      formData.append("image", compressedImage);

      const response = await uploadImageMutation(formData).unwrap();
      if (response.success) {
        setImageUrl(response.imageId);
        return response.imageId;
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  return { uploadImage, imageUrl };
};

export default useImageUpload;
