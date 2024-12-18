import DATA from "./../../public/shortData.json";
import Profile from "./Profile";

// Use a more flexible type that allows different array structures
type ProfileData = (string | number)[];

const Homepage = () => {
  const perPage = 30;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] place-items-center gap-y-2">
      {DATA.slice(0, perPage).map((item: ProfileData, index: number) => (
        <Profile
          key={index}
          id={Number(item[0]) + 1}
          name={String(item[1])}
          profession={String(item[2])}
          info={String(item[3])}
          martyrDate={String(item[4])}
          imageUrl={`/photos/${item[0]}.jpg`}
        />
      ))}
    </div>
  );
};

export default Homepage;
