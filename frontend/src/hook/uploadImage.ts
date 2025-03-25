import { useState } from "react";

const useImageUpload = (defaultImage: string, uploadUrl: string) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);

  const uploadImage = async (image: File): Promise<string> => {
    if (!image || !(image instanceof File)) {
      alert("Please upload a valid image file.");
      return imageUrl; // Return the existing image URL if no new file is provided
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: imageFormData,
      });

      const data = await response.json();
      if (data.success) {
        const uploadedUrl = data.data.url;
        setImageUrl(uploadedUrl);
        return uploadedUrl; // ✅ Return the uploaded image URL
      } else {
        alert("Failed to upload image. Using default image.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Using default image.");
    }

    return imageUrl;
  };

  return { uploadImage };
};

export default useImageUpload;
