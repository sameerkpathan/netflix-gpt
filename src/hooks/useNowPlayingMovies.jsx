import axios from "axios";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../assets/constants";
import { addNowPlayingMovies } from "../Utils/Store/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        API_OPTIONS,
      );
      const movieData = await response.data;
      dispatch(addNowPlayingMovies(movieData));
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
