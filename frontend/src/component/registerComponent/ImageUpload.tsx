import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) { // 1MB = 1024 * 1024 bytes
      setError("File size must be less than 1MB.");
      setImage(null);
      return;
    }

    // Validate file format
    const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/jfif"];
    if (!validFormats.includes(file.type)) {
      setError("Invalid file format. Allowed: JPG, JPEG, PNG, JFIF.");
      setImage(null);
      return;
    }

    // Read file and set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-80">
      <label
        htmlFor="files"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Upload Image
        <input
          name="image"
          type="file"
          className="hidden"
          id="files"
          accept="image/jpeg, image/png, image/jpg, image/jfif"
          onChange={handleImageUpload}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {image && (
        <div className="relative border rounded-lg overflow-hidden max-w-[200px] max-h-[200px]">
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-700"
          >
            <AiOutlineCloseCircle size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
