// app/api/cloudinary/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
export const runtime = "nodejs";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

function generateSignature(publicId: string, timestamp: number) {
  return crypto
    .createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { publicId, resourceType } = await req.json();
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(publicId, timestamp);

    const formData = new URLSearchParams();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", API_KEY);
    formData.append("signature", signature);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType || "image"}/destroy`,
      formData.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json({ error: "Delete failed", details: err }, { status: 500 });
  }
}
