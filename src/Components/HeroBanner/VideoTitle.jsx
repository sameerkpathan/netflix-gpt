const VideoTitle = ({ overview, title }) => {
  //   console.log(overview, title);
  return (
    <div className="absolute flex flex-col justify-center w-screen aspect-video pt-[25%] px-24  text-white bg-gradient-to-r from-black via-black/70 to-transparent">
      <h1 className="text-6xl font-bold mb-6">{title}</h1>
      <p className="mb-6 text-lg  max-w-xl">{overview}</p>
      <div className="flex gap-4">
        <button className="flex items-center gap-2  bg-gray-400 text-black text-lg py-3  px-8 cursor-pointer opacity-70 rounded hover:opacity-55 transition">
          ▶ Play
        </button>
        <button className="flex items-center gap-2  bg-gray-400 text-black text-lg py-3 mx-2 px-8 cursor-pointer opacity-70  rounded hover:opacity-55 transition">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
