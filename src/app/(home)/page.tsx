import { PostApis } from "@/api";
import HomeLayout from "@/layouts/home/home-page/HomeLayout";

export default async function App() {
  const res = await PostApis.getMulti();
  return <HomeLayout items={res.data} totalItems={res.totalItems} />;
}
