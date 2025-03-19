import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setError("File size must be less than 1MB.");
      setImage(null);
      setFileName("No file chosen");
      return;
    }

    // Validate file format
    const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/jfif"];
    if (!validFormats.includes(file.type)) {
      setError("Invalid file format. Allowed: JPG, JPEG, PNG, JFIF.");
      setImage(null);
      setFileName("No file chosen");
      return;
    }

    // Read file and set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setFileName(file.name);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-80">
      <label className="flex items-center border rounded-lg overflow-hidden w-full cursor-pointer">
        <span className="bg-blue-500 text-white px-4 py-2">Choose file</span>
        <span className="flex-1 px-2 truncate">{fileName}</span>
        <input
          name="image"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/jpg, image/jfif"
          onChange={handleImageUpload}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

    </div>
  );
};

export default ImageUpload;
