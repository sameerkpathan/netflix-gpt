import axios from "axios";
import { API_OPTIONS } from "../../assets/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../../Utils/Store/moviesSlice";

const VideoBackground = ({ movieId }) => {
  const TrailerKey = useSelector((store) => store.movies?.trailerVideo);
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS,
      );
      const getMovieTrailer = response.data;

      const getTrailer = getMovieTrailer?.results?.find(
        (video) => video.type === "Trailer" && video.official === true,
      );

      const getTeaser = getMovieTrailer?.results?.find((video) => {
        return video.type === "Teaser";
      });

      const Trailer = getTrailer || getTeaser;

      dispatch(addTrailerVideo(Trailer));
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);

  return (
    <div className="w-screen ">
      <iframe
        className="w-screen aspect-video  pointer-events-none"
        src={
          "https://www.youtube.com/embed/" +
          TrailerKey?.key +
          "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
