import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { EPostPrivacy } from "@/context/enums/EPostPrivacy.enum";
import { IPost } from "@/interfaces/public/IPost.interface";

// Hash chuỗi id thành số nguyên — dùng làm seed cho Faker
function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // ép về 32-bit int
  }
  return Math.abs(hash);
}

function generateFakeAuthor() {
  const fullName = faker.person.fullName();
  return {
    id: faker.string.uuid(),
    username: faker.internet.username({ firstName: fullName.split(" ")[0] }),
    fullName,
    avatar: faker.image.avatar(),
  };
}

// Nếu truyền id → seed Faker theo id đó, đảm bảo gọi lại nhiều lần với
// cùng 1 id sẽ luôn ra CÙNG MỘT kết quả (tái tạo được, không cần lưu DB).
// Nếu không truyền id → tự sinh id ngẫu nhiên bằng crypto.randomUUID
// (không dùng faker.string.uuid() ở bước này để tránh bị ảnh hưởng bởi
// seed cũ còn sót lại từ lần gọi trước).
export function generateFakePost(
  idParam?: string,
): IPost & { authorData: any; isFake: boolean } {
  const postId = idParam ?? randomUUID();
  faker.seed(hashStringToSeed(postId));

  const hasImage = faker.datatype.boolean();
  const author = generateFakeAuthor();

  const post = {
    id: postId,
    caption: faker.lorem.sentences({ min: 1, max: 3 }),
    privacy: EPostPrivacy.PUBLIC,
    bgColor: hasImage
      ? ""
      : faker.helpers.arrayElement([
          "#4F46E5",
          "#059669",
          "#DC2626",
          "#D97706",
          "#7C3AED",
        ]),
    author: author.id,
    authorData: author,
    commentsCount: faker.number.int({ min: 0, max: 40 }),
    viewsCount: faker.number.int({ min: 0, max: 2000 }),
    likes: [],
    likeCount: faker.number.int({ min: 0, max: 300 }),
    images: hasImage
      ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
          id: faker.string.uuid(),
          url: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
          type: "image/jpeg",
          size: faker.number.int({ min: 50000, max: 2000000 }),
          width: 800,
          height: 600,
        }))
      : [],
    videos: [],
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: new Date().toISOString(),
    hashtags: [],
    isFake: true,
  } as unknown as IPost & { authorData: any; isFake: boolean };

  return post;
}

export function generateFakePosts(count: number) {
  return Array.from({ length: count }, () => generateFakePost());
}

// Regex nhận diện UUID v4 — dùng để phân biệt id giả (crypto.randomUUID)
// với id thật của Firestore (chuỗi 20 ký tự alphanumeric, không có dấu "-")
export function isFakePostId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
}
