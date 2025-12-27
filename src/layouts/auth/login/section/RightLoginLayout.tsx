import PostCard from "@/components/card/post-card/PostCard";

const randomInt = () => Math.floor(Math.random() * (9999999 - 0 + 1)) + 0;

const mockPosts = [
  {
    id: "post-01",
    author: "user_001",
    authorData: {
      id: "user_001",
      email: "linh.nguyen@gmail.com",
      username: "linhng",
      avatar: {
        url: "https://i.pravatar.cc/150?img=1",
      },
      location: "Hà Nội",
    },
    caption:
      "Sáng nay dậy sớm hơn thường lệ, pha một ly cà phê và ngồi nhìn phố.",
    privacy: "PUBLIC",
    hashtags: ["#caphe", "#buoisang"],
    commentsCount: 12,
    viewsCount: 340,
    createdAt: "2025-12-26T07:10:00.000Z",
    updatedAt: "2025-12-26T07:10:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-06",
    author: "user_006",
    authorData: {
      id: "user_006",
      email: "noah.johnson@mail.com",
      username: "noahj",
      avatar: {
        url: "https://i.pravatar.cc/150?img=6",
      },
      location: "Berlin, Germany",
    },
    caption: "Cold weather, warm coffee, and a long to-do list.",
    privacy: "PUBLIC",
    hashtags: ["#winter", "#workday"],
    commentsCount: 5,
    viewsCount: 200,
    createdAt: "2025-12-23T09:15:00.000Z",
    updatedAt: "2025-12-23T09:15:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-07",
    author: "user_007",
    authorData: {
      id: "user_007",
      email: "tuan.le@gmail.com",
      username: "tuanle",
      avatar: {
        url: "https://i.pravatar.cc/150?img=7",
      },
      location: "Bình Dương",
    },
    caption: "Lâu rồi mới gặp lại đám bạn cũ, nói chuyện mà quên cả giờ.",
    bgColor: "linear-gradient(200deg, #c471f5 0%, #fa71cd 100%)",
    privacy: "FRIENDS",
    hashtags: ["#banbe", "#kyuc"],
    commentsCount: 17,
    viewsCount: 430,
    createdAt: "2025-12-22T20:40:00.000Z",
    updatedAt: "2025-12-22T20:40:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-08",
    author: "user_008",
    authorData: {
      id: "user_008",
      email: "olivia.harris@mail.com",
      username: "oliviah",
      avatar: {
        url: "https://i.pravatar.cc/150?img=8",
      },
      location: "Amsterdam, Netherlands",
    },
    caption: "Sometimes doing nothing is exactly what you need.",
    privacy: "PUBLIC",
    hashtags: ["#slowdown", "#selfcare"],
    commentsCount: 9,
    viewsCount: 310,
    createdAt: "2025-12-21T15:00:00.000Z",
    updatedAt: "2025-12-21T15:00:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-10",
    author: "user_010",
    authorData: {
      id: "user_010",
      email: "ethan.lee@mail.com",
      username: "ethanl",
      avatar: {
        url: "https://i.pravatar.cc/150?img=10",
      },
      location: "Singapore",
    },
    caption: "Wrapped up a long week. Time to disconnect for a bit.",
    privacy: "PUBLIC",
    hashtags: ["#weekend", "#rest"],
    commentsCount: 11,
    viewsCount: 360,
    createdAt: "2025-12-20T17:00:00.000Z",
    updatedAt: "2025-12-20T17:00:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-11",
    author: "user_011",
    authorData: {
      id: "user_011",
      email: "minh.tran@gmail.com",
      username: "minhtran",
      avatar: {
        url: "https://i.pravatar.cc/150?img=11",
      },
      location: "TP. Hồ Chí Minh",
      isVerified: true,
    },
    caption:
      "Cuối tuần không đi đâu xa, chỉ ở nhà dọn dẹp lại phòng cũng thấy nhẹ đầu hơn.",
    privacy: "PUBLIC",
    hashtags: ["#cuoituan", "#songcham"],
    commentsCount: 7,
    viewsCount: 280,
    createdAt: "2025-12-17T10:20:00.000Z",
    updatedAt: "2025-12-17T10:20:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-12",
    author: "user_012",
    authorData: {
      id: "user_012",
      email: "thao.le@gmail.com",
      username: "thaole",
      avatar: {
        url: "https://i.pravatar.cc/150?img=12",
      },
      location: "Đà Nẵng",
    },
    caption: "Biển sáng nay yên đến lạ, chỉ có tiếng sóng và gió.",
    privacy: "PUBLIC",
    images: [
      {
        id: "img-12",
        type: "image/jpeg",
        size: 420000,
        width: 1080,
        height: 720,
        url: "https://picsum.photos/1080/720?12",
      },
    ],
    hashtags: ["#bien", "#danang"],
    commentsCount: 16,
    viewsCount: 620,
    createdAt: "2025-12-16T06:45:00.000Z",
    updatedAt: "2025-12-16T06:45:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-13",
    author: "user_013",
    authorData: {
      id: "user_013",
      email: "john.smith@mail.com",
      username: "johnsmith",
      avatar: {
        url: "https://i.pravatar.cc/150?img=13",
      },
      location: "New York, USA",
    },
    caption:
      "Sometimes you just need a quiet evening with no notifications and no plans.",
    privacy: "PUBLIC",
    hashtags: ["#quietlife", "#eveningthoughts"],
    commentsCount: 11,
    viewsCount: 390,
    createdAt: "2025-12-15T20:10:00.000Z",
    updatedAt: "2025-12-15T20:10:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-14",
    author: "user_014",
    authorData: {
      id: "user_014",
      email: "huy.pham@gmail.com",
      username: "huypham",
      avatar: {
        url: "https://i.pravatar.cc/150?img=14",
      },
      location: "Cần Thơ",
    },
    caption: "Lâu rồi mới có bữa ăn tối đủ mặt cả nhà, nói chuyện tới khuya.",
    privacy: "FRIENDS",
    images: [
      {
        id: "img-14",
        type: "image/jpeg",
        size: 300000,
        width: 1080,
        height: 1080,
        url: "https://picsum.photos/1080/1080?14",
      },
    ],
    hashtags: ["#giadinh", "#toiam"],
    commentsCount: 19,
    viewsCount: 510,
    createdAt: "2025-12-15T19:00:00.000Z",
    updatedAt: "2025-12-15T19:00:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-15",
    author: "user_015",
    authorData: {
      id: "user_015",
      email: "sophia.green@mail.com",
      username: "sophiag",
      avatar: {
        url: "https://i.pravatar.cc/150?img=15",
      },
      location: "London, UK",
    },
    caption: "Rainy days make me slow down and appreciate the little things.",
    bgColor: "linear-gradient(300deg, #6a11cb 0%, #2575fc 100%)",
    privacy: "PUBLIC",
    hashtags: ["#rainyday", "#slowdown"],
    commentsCount: 10,
    viewsCount: 340,
    createdAt: "2025-12-14T09:30:00.000Z",
    updatedAt: "2025-12-14T09:30:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-17",
    author: "user_017",
    authorData: {
      id: "user_017",
      email: "liam.brown@mail.com",
      username: "liamb",
      avatar: {
        url: "https://i.pravatar.cc/150?img=17",
      },
      location: "Toronto, Canada",
    },
    caption: "Just finished a long walk and cleared my head a bit.",
    privacy: "PUBLIC",
    hashtags: ["#walk", "#mentalhealth"],
    commentsCount: 4,
    viewsCount: 190,
    createdAt: "2025-12-12T18:40:00.000Z",
    updatedAt: "2025-12-12T18:40:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-18",
    author: "user_018",
    authorData: {
      id: "user_018",
      email: "lan.nguyen@gmail.com",
      username: "lannguyen",
      avatar: {
        url: "https://i.pravatar.cc/150?img=18",
      },
      location: "Hải Phòng",
    },
    caption: "Học cách không vội vàng với mọi thứ, kể cả chính mình.",
    privacy: "PUBLIC",
    bgColor: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
    hashtags: ["#songcham", "#tamtrang"],
    commentsCount: 13,
    viewsCount: 480,
    createdAt: "2025-12-12T08:15:00.000Z",
    updatedAt: "2025-12-12T08:15:00.000Z",
    likeCount: randomInt(),
  },
  {
    id: "post-19",
    author: "user_019",
    authorData: {
      id: "user_019",
      email: "daniel.kim@mail.com",
      username: "danielk",
      avatar: {
        url: "https://i.pravatar.cc/150?img=19",
      },
      location: "Seoul, South Korea",
    },
    caption: "Late night coding session, coffee is doing its job.",
    privacy: "FRIENDS",
    hashtags: ["#codinglife", "#latenight"],
    commentsCount: 6,
    viewsCount: 260,
    createdAt: "2025-12-11T23:10:00.000Z",
    updatedAt: "2025-12-11T23:10:00.000Z",
    likeCount: randomInt(),
  },
];

export default function RightLoginLayout() {
  return (
    <div className="relative bg-(--color-background) -rotate-3 lg:top-20 hidden md:block w-1/2 shadow-2xl">
      <div className="bg-(--color-card-dark) h-14 flex items-center justify-between px-3 rounded-t-lg">
        <div className="flex justify-start gap-2">
          <div className={`w-3 h-3 p-1 bg-red-500 rounded-full`}></div>
          <div className={`w-3 h-3 p-1 bg-yellow-400 rounded-full`}></div>
          <div className={`w-3 h-3 p-1 bg-green-400 rounded-full`}></div>
        </div>

        <div className="h-8 flex flex-1 mx-5 px-2 bg-(--color-card) rounded-md items-center justify-start">
          <p className="text-(--color-text) text-sm font-medium">
            https://driftly.com
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 w-full h-screen gap-5 px-3 overflow-hidden">
        {/* CỘT TRÁI */}
        <div className="relative overflow-hidden h-full">
          <div className="marquee-vertical-up flex flex-col w-full gap-5 card-shadow">
            {[...mockPosts.slice(0, 6), ...mockPosts.slice(0, 10)].map(
              (item, i) => (
                <PostCard key={i} item={item as any} />
              )
            )}
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="relative overflow-hidden h-full hidden lg:block">
          <div className="marquee-vertical-down flex flex-col w-full gap-5 card-shadow">
            {[...mockPosts.slice(7, 13), ...mockPosts.slice(10, 20)].map(
              (item, i) => (
                <PostCard key={i} item={item as any} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
