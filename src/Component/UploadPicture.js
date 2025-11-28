// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const UPLOAD_PRESET = "foodupload";
// const CLOUD_NAME = "dnrqbczvj";

// export default function UploadPicture() {
//   const [logoUrl, setLogoUrl] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const uploafToCloudinary = async (file) => {
//     console.log(file);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       return data.secure_url;
//     } catch (error) {
//       console.error("Cloudinary upload failed:", error);
//     }
//   };

//   const handleLogoUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const url = await uploafToCloudinary(file);
//       setLogoUrl(url);
//     } catch (err) {
//       console.log("Failed to upload logo:" + err.messege);
//     } finally {
//       setUploading(false);
//     }
//   };
//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleLogoUpload}
//         disabled={uploading}
//         className="mb-4 p-2 border border-gray-300 rounded"
//       />

//       {uploading && <p className="text-blue-600">Uploading...</p>}

//       {logoUrl && (
//         <div className="my-4">
//           <p className="tect-green-600 font-semibold mb-2">Logo uploaded!</p>

//           <div>
//             <Image
//               src={logoUrl}
//               alt="Upload logo"
//               fill
//               //   className="object-contain rounded border border-gray-300"
//             />
//           </div>
//           <p>{logoUrl}</p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useState } from "react";

const UPLOAD_PRESET = "foodupload";
const CLOUD_NAME = "dnrqbczvj";

export default function UploadPicture() {
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploafToCloudinary = async (file) => {
    console.log(file);
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
      setLogoUrl(url);
    } catch (err) {
      console.log("Failed to upload logo:" + err.messege);
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="w-full h-[150px] flex flex-col items-center justify-center gap-2 border border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] cursor-pointer">
      {uploading ? (
        "Uploading..."
      ) : (
        <>
          <div className="text-xl">📷</div>
          <p className="text-sm text-gray-600">
            Choose a file or drag & drop it here
          </p>
        </>
      )}

      {/* <Image
        src={logoUrl}
        alt="Upload logo"
        fill
        //   className="object-contain rounded border border-gray-300"
      />

      <p>{logoUrl}</p> */}

      <input type="file" className="" onChange={handleLogoUpload} />
    </label>
  );
}
