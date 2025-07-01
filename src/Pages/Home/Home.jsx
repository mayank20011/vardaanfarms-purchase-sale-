import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex gap-4">
        <Link
          to="/purchase"
          className="px-4 py-2 bg-black/60 text-white rounded-2xl hover:scale-95 transition"
        >
          Purchase
        </Link>
        <Link
          to="/dispatch"
          className="px-4 py-2 bg-black/60 text-white rounded-2xl hover:scale-95 transition"
        >
          Dispatch
        </Link>
      </div>
    </div>
  );
};

export default Home;
