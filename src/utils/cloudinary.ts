import axios from "axios";
import crypto from 'crypto';

export async function upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset",  `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
  const resourceType = file.type.startsWith("video") ? "video" : "image";

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      formData
    );

    if (resourceType === 'image'){
      return{
        id: res.data.public_id ?? '',
        url: res.data.secure_url ?? '',
        type: res.data.resource_type ?? '',
        width: res.data.width ?? null,
        height: res.data.height ?? null,
        size: file.size ?? 0,
      }
    }else{
      return {
        id: res.data.public_id ?? '',
        url: res.data.secure_url ?? '',
        type: res.data.resource_type ?? '',
        width: res.data.width ?? null,
        duration: res.data.duration ?? null,
        size: file.size ?? 0,
      };
    }


  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}

const generateSHA1 = (data: string) => {
  return crypto.createHash("sha1").update(data).digest("hex");
};

export const removeFile = async (publicId: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const timestamp = Math.floor(Date.now() / 1000); // seconds

  // Tạo signature chuẩn
  const signature = generateSHA1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`);

  const formData = new URLSearchParams();
  formData.append("public_id", publicId);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      formData.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log(res.data); // { result: 'ok' } nếu xóa thành công
  } catch (err) {
    console.error("Delete failed:", err);
  }
};