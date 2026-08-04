import { NextResponse } from "next/server";
import { generateFakePosts } from "@/utils/fake-post.util";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  // Không lưu DB, không cursor thật — mỗi lần gọi Faker random mới,
  // nên infinite scroll cuộn hoài không hết, F5 lại thì bài cũng khác luôn
  const posts = generateFakePosts(limit);

  return NextResponse.json({
    data: posts,
    nextPage: page + 1,
    hasMore: true, // luôn còn — đây là "vô hạn" thật sự
  });
}