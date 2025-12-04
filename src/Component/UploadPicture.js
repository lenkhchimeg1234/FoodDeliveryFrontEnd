"use client";

import Image from "next/image";
import { useState } from "react";

const UPLOAD_PRESET = "foodupload";
const CLOUD_NAME = "dnrqbczvj";

export default function UploadPicture({ onUpload, food }) {
  // const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploafToCloudinary = async (file) => {
    // console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploafToCloudinary(file);
      onUpload(url);
    } catch (err) {
      console.log("Failed to upload logo:" + err.messege);
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="relative w-full h-[150px] flex flex-col items-center justify-center gap-2 border border-dashed border-[#CBD5E1] rounded-xl cursor-pointer overflow-hidden bg-gray-50">
      {food.image ? (
        <Image
          src={food.image}
          alt="Upload logo"
          fill
          className="object-cover rounded border border-gray-300 "
        />
      ) : (
        <>
          <div className="text-xl">📷</div>
          <p className="text-sm text-gray-600">
            Choose a file or drag & drop it here
          </p>
        </>
      )}

      <input type="file" className="" onChange={handleLogoUpload} />
    </label>
  );
}
