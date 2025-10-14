import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "FileImage");
  formData.append("cloud_name", "dxbxoyen9");

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/dxbxoyen9/image/upload`,
    formData
  );

  return res.data.secure_url;
};
