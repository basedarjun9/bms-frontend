import React from "react";
import TheaterTimings from "../components/movies/TheaterTimings";
import { filters } from "../utils/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMovieById } from "../apis";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  // Get movie ID from URL
  const { id } = useParams();

  // API call
  const {
    data: movieResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });

  // Actual movie object returned from backend
  const movie = movieResponse?.data?.movie;

  console.log("Movie Response:", movieResponse);
  console.log("Movie:", movie);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading movie...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    console.error("Something went wrong:", error);

    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Something went wrong while loading the movie.
        </p>
      </div>
    );
  }

  // If movie is not available
  if (!movie) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Movie not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          MOVIE DETAILS SECTION
      ====================================================== */}

      <div
        className="relative text-white font-sans px-4 py-4.5"
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Actual Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row gap-5">

          {/* =================================================
              POSTER
          ================================================== */}

          <div>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-xl w-25 h-[200px] object-cover shadow-xl"
            />
          </div>

          {/* =================================================
              MOVIE DETAILS
          ================================================== */}

          <div className="flex flex-col justify-start flex-1">

            {/* Movie Title */}
            <h1 className="text-2xl font-bold mb-2">
              {movie.title}
            </h1>

            {/* Rating + Votes */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#3a3a3a] px-2 py-1.5 rounded-md flex items-center gap-2 text-xs">

                <span className="text-pink-500 font-bold">
                  ★ {movie.rating}
                </span>

                <span className="text-gray-300">
                  {movie.votes} Votes
                </span>

                <button
                  type="button"
                  className="cursor-pointer bg-[#2f2f2f] ml-2 px-2 py-1 rounded-md hover:bg-[#4a4a4a]"
                >
                  Rate Now
                </button>

              </div>
            </div>

            {/* Format + Languages */}
            <div className="flex items-center gap-2 text-[11px] mb-2">

              <span className="bg-[#3a3a3a] px-1.5 py-0.5 rounded">
                {movie.format?.join(", ")}
              </span>

              <span className="bg-[#3a3a3a] px-1.5 py-0.5 rounded">
                {movie.languages?.join(", ")}
              </span>

            </div>

            {/* Duration + Genre + Certification + Release Date */}
            <p className="text-[11px] text-gray-300 mb-2">
              {movie.duration} •{" "}
              {movie.genre?.join(", ")} •{" "}
              {movie.certification} •{" "}
              {movie.releaseDate}
            </p>

            {/* About Movie */}
            <div>

              <h2 className="text-base font-bold mb-1">
                About the movie
              </h2>

              <p className="text-[11px] text-gray-50 leading-tight mb-2">
                {movie.description}
              </p>

            </div>

          </div>

          {/* =================================================
              SHARE BUTTON
          ================================================== */}

          <div className="absolute top-0 right-0 cursor-pointer">

            <button
              type="button"
              className="cursor-pointer bg-[#3a3a3a] px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12 4.21 9.12 2.87 10.46 2.87 12.12s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>

              Share
            </button>

          </div>

        </div>
      </div>

      {/* =====================================================
          SHOW TIMINGS SECTION
      ====================================================== */}

      <div className="max-w-7xl mx-auto mt-8">

        {/* =================================================
            FILTERS
        ================================================== */}

        <div className="flex flex-wrap items-center gap-2 mb-2 justify-center">

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="border border-gray-300 px-5 py-1 rounded-lg cursor-pointer text-sm hover:bg-gray-100"
            >
              {filter}
            </button>
          ))}

        </div>

        <hr className="my-2 border-gray-200" />

        {/* =================================================
            AVAILABILITY STATUS
        ================================================== */}

        <div className="flex items-center justify-center gap-4">

          {/* Available */}
          <span className="flex items-center gap-1">

            <span className="w-2 h-2 mr-1 bg-black rounded-full inline-block"></span>

            <small className="font-semibold text-gray-500">
              Available
            </small>

          </span>

          {/* Filling Fast */}
          <span className="flex items-center gap-1">

            <span className="w-2 h-2 mr-1 bg-yellow-400 rounded-full inline-block"></span>

            <small className="font-semibold text-gray-500">
              Filling fast
            </small>

          </span>

          {/* Almost Full */}
          <span className="flex items-center gap-1">

            <span className="w-2 h-2 mr-1 bg-red-400 rounded-full inline-block"></span>

            <small className="font-semibold text-gray-500">
              Almost full
            </small>

          </span>

        </div>

        {/* =================================================
            THEATERS AND TIMINGS
        ================================================== */}

        <TheaterTimings movieId={id}/>

      </div>
    </>
  );
};

export default MovieDetails;