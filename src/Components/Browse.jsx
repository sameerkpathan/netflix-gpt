import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./HeroBanner/MainContainer";
import SecondaryContainer from "./HeroBanner/SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;

{
  // MainContainer
  //   - VideoBackground
  //   - videocard
  //   secondaryContainer
  //     - movies list
  //     - cards
}
