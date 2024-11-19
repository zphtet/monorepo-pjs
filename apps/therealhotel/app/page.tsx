import Banner from "@/components/banner";
import ExploreMap from "@/components/explore-map";
import InTheWild from "@/components/in-the-wild";
import Stacks from "@/components/stacks";
export default function Home() {
  return (
    <div className="">
      <Banner />
      <ExploreMap />
      <div className="min-h-[60vh] py-36">
        <InTheWild text="In The Wild" />
      </div>
      <Stacks />
      <div className="h-[100vh]"></div>
    </div>
  );
}