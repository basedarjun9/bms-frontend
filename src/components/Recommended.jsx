import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRecommendedMovies } from "../apis";
import { useLocation } from "../context/LocationContext"
const Recommended = () => {

const navigate = useNavigate()
const {location}=useLocation()

 const handleNavigate = (movie) => {
    const originalTitle = movie.title;
    const cleanedTitle = originalTitle.includes(":") ? originalTitle.replace(/:/g, "") : originalTitle;
    const formattedTitle = cleanedTitle.replace(/\s+/g, "-").toLowerCase();
    navigate(`/movies/${location}/${formattedTitle}/${movie._id}/ticket`)
  }

  //API CALL
  const {
    data: recMovies,
    isError,
    error,
  } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: getRecommendedMovies,
    placeholderData: keepPreviousData,
  });

  console.log("recMovies:", recMovies);

  if (isError) {
    console.log("Something went wrong:", error);
  }

  return (
    <div className="w-full py-6 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">

        <div className="items-center flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            Recommended Movies
          </h1>

          <span
            onClick={()=>navigate("/movies")}
            className="text-md text-red-500 cursor-pointer hover:underline"
          >
            See All
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">

          {recMovies?.data?.topMovies.map((movie,i) => (

            <div
              key={movie._id} onClick={()=>handleNavigate(movie)}
              className="w-[200px] rounded overflow-hidden cursor-pointer"
            >

              <div className="relative">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-[260px] object-cover rounded"
                />
              </div>

              <div className="bg-black text-white text-sm px-2 py-1 flex items-center justify-between">
                <span>⭐ {movie.rating}/10</span>
                <span>{movie.votes}</span>
              </div>

              <div className="px-2 py-1">
                <h3 className="font-semibold text-lg">
                  {movie.title}
                </h3>

                <p className="text-md text-gray-500">
                  {movie.genre?.join(" | ")}
                </p>
              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default Recommended;