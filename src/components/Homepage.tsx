import List from "./List";

const Homepage = () => {
  return (
    <main>
      <div>
        <p className="font-bold md:text-3xl lg:text-4xl text-2xl text-start m-3 py-2 border-b">আন্দোলনে <span className="text-red-600">শহীদদের</span> তালিকা</p>
      </div>
      <List />
    </main>
  );
};

export default Homepage;
