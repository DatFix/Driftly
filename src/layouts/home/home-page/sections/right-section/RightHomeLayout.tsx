import { HashtagApis, OthersApis, UserApis } from "@/api";
import BaseConfirmAlert from "@/components/alert/BaseConfirmAlert";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import BaseCard from "@/components/card/BaseCard";
import BaseEmpty from "@/components/empty/BaseEmpty";
import {
  FollowIcon,
  InfoIcon,
  TrendingDownIcon,
  TrendingIcon,
  TrendingUpIcon,
  UpdatedIcon,
  UserGroupIcon,
} from "@/components/icons/BaseIcon";
import { useAuth } from "@/context/AuthContext";
import { IHashtag } from "@/interfaces/public/IHashtag.interface";
import { IImage } from "@/interfaces/public/IPost.interface";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RightHomeLayout() {
  const { user } = useAuth();
  const [trending, setTrending] = useState<IHashtag[]>([]);
  const [suggest, setSuggest] = useState<IUser[] | null>(null);
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTrending() {
      const res = await HashtagApis.findByPopularity();
      setTrending(res.data);
    }

    if (user) {
      async function fetchSuggestFollowing() {
        const res = await OthersApis.suggestFollowing(user?.id as string);
        setSuggest(res.data);
      }
      fetchSuggestFollowing();
    }

    fetchTrending();
  }, [user]);

  const handleFollow = async (followerId: string) => {
    await UserApis.followToggle(user?.id as string, followerId);
  };

  return (
    <div className="flex flex-col gap-5">
      <BaseCard>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex object-center justify-center gap-2 text-(--color-title)">
            <TrendingIcon /> Xu hướng
          </div>
          <div className="flex flex-col w-full">
            {trending &&
              trending.map((tag, index) => (
                <div
                  onClick={() => router.push(`/hashtag/${tag.id}`)}
                  key={tag.id}
                  className="flex items-center group justify-start gap-2 hover:bg-(--color-dark-light) rounded-sm px-2 transition-all duration-300"
                >
                  <div className="w-16 h-10 flex group-hover:bg-(--color-primary) group-hover:text-white transition-all duration-300 items-center justify-center gap-1 bg-(--color-dark-light) rounded-sm text-(--color-text)">
                    {index === 0 ? (
                      <TrendingIcon stroke={1.5} color="currentColor" />
                    ) : index === 1 || index === 2 ? (
                      <TrendingUpIcon stroke={1.5} color="currentColor" />
                    ) : index === 3 || index === 4 ? (
                      <TrendingDownIcon stroke={1.5} color="currentColor" />
                    ) : null}
                    {index + 1}
                  </div>
                  <div className="w-full rounded-lg p-2 cursor-pointer">
                    <div className="font-medium text-(--color-primary)">
                      #{tag.name}
                    </div>
                    <div className="text-sm text-(--color-text) text-[12px]">
                      {tag.popularity} Bài viết
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </BaseCard>

      {user && (
        <BaseCard>
          <div className="flex items-center justify-start gap-2 text-(--color-title)">
            <UserGroupIcon /> Đề xuất theo dõi
          </div>

          <div className="mt-5">
            {suggest && suggest.length > 0 ? (
              suggest.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center justify-start gap-2"
                >
                  <BaseAvatar
                    url={(item?.avatar as IImage)?.url}
                    name={user?.username}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <p className="text-sm text-(--color-text)">
                      {item?.username}
                    </p>

                    {item.id !== user?.id &&
                      (item.followers?.some(
                        (followerId) => followerId === user?.id
                      ) ? (
                        <button
                          onClick={() => setOpenAlert(true)}
                          className="px-2 py-0.5 rounded-full bg-(--color-primary) text-[12px] text-white cursor-pointer flex items-center justify-center gap-1"
                          >
                          <UpdatedIcon color="#FFF" width={16} height={16} />{" "}
                          Đang theo dõi
                        </button>
                      ) : (
                        <button
                          onClick={() => handleFollow(item?.id as string)}
                          className="px-2 py-0.5 rounded-full bg-(--color-primary) text-[12px] text-white cursor-pointer flex items-center justify-center gap-1"
                        >
                          <FollowIcon color="#FFF" width={16} height={16} />{" "}
                          Theo dõi
                        </button>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <BaseEmpty />
            )}
          </div>
        </BaseCard>
      )}
    </div>
  );
}
