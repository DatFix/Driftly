import { IPost } from "@/interfaces/public/IPost.interface";
import BaseCard from "../BaseCard";
import HeaderPostCard from "./sections/HeaderPostCard";
import MainPostCard from "./sections/MainPostCard";
import FooterPostCard from "./sections/FooterPostCard";

export default function PostCard({ item }: { item: IPost }) {
  return (
    <BaseCard padding={0}>
      <HeaderPostCard item={item} />
      <MainPostCard item={item} />
      <FooterPostCard item={item} />
    </BaseCard>
  );
}
