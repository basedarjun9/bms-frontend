import React from "react";
import { MdChair } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../../apis";
import dayjs from "dayjs";

const BookingHistory = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBookings,
    retry: false,
  });

  // Debug the API response.
  console.log("Full booking API response:", data);
  console.log("Booking API error:", error);

  const bookings = data?.data?.bookings;

  // Loading state
  if (isPending) {
    return (
      <div className="px-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">
          Your Bookings
        </h3>
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="px-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">
          Your Bookings
        </h3>

        <p className="text-red-500">
          {error?.response?.data?.message ||
            error?.message ||
            "Failed to load bookings."}
        </p>

        {error?.response?.status && (
          <p className="mt-2 text-sm text-gray-500">
            HTTP Status: {error.response.status}
          </p>
        )}

        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 rounded bg-[#f74565] text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <div className="px-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">
          Your Bookings
        </h3>

        <p className="text-gray-500">
          No bookings found for this account.
        </p>
      </div>
    );
  }

  // Display bookings using your original design.
  return (
    <div className="px-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">
        Your Bookings
      </h3>

      {bookings.map((booking) => {
        const show = booking?.showId;
        const movie = show?.movie;
        const theater = show?.theater;
        const seats = Array.isArray(booking?.seats)
          ? booking.seats
          : [];
        const fee = booking?.bookingFee || {};

        return (
          <div key={booking._id} className="mb-8">
            <div className="bg-white p-5 rounded-md mb-2 overflow-hidden">
              <div className="flex items-start gap-10">
                {movie?.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={movie?.title || "Movie poster"}
                    className="w-30 h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-30 h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    No poster
                  </div>
                )}

                <div className="h-40 border-l border-gray-300 border-dashed" />

                <div className="flex items-start justify-between w-full gap-3">
                  <div className="flex-1">
                    <p className="font-normal text-lg">
                      {movie?.title || "Movie details unavailable"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {Array.isArray(movie?.format)
                        ? movie.format.join(" | ")
                        : ""}
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      {show?.date
                        ? dayjs(
                            show.date,
                            ["DD-MM-YYYY", "YYYY-MM-DD"]
                          ).format("D MMMM YY")
                        : "Date unavailable"}
                      {" - "}
                      {show?.startTime || "Time unavailable"}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {theater?.name || "Theatre unavailable"}
                      {" "}
                      {theater?.location || ""}
                    </p>

                    <small className="text-gray-700 mt-1 block">
                      Quantity: {seats.length}
                    </small>

                    <p className="text-md font-semibold text-gray-700 mt-2">
                      <MdChair
                        className="inline mr-2"
                        size={24}
                      />
                      {seats.length
                        ? seats.join(", ")
                        : "Seat details unavailable"}
                    </p>
                  </div>

                  <p>M-Ticket</p>
                </div>
              </div>

              <div className="p-4 text-right">
                <p className="text-sm text-gray-500">
                  Ticket: ₹{fee.ticketPrice ?? 0}
                  {" + Convenience Fees: ₹"}
                  {fee.convenience ?? 0}
                </p>

                <p className="text-xl font-bold">
                  ₹{fee.total ?? 0}
                </p>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold">
                  Booking Date &amp; Time
                </p>
                <p>
                  {booking.bookingDateTime &&
                  dayjs(booking.bookingDateTime).isValid()
                    ? dayjs(booking.bookingDateTime).format(
                        "DD MMM YYYY, h:mm A"
                      )
                    : "Unavailable"}
                </p>
              </div>

              <div>
                <p className="font-semibold">Payment Method</p>
                <p>
                  {booking.paymentMethod
                    ? booking.paymentMethod.toUpperCase()
                    : "Unavailable"}
                </p>
              </div>

              <div>
                <p className="font-semibold">Booking ID</p>
                <p>
                  {booking.bookingRef || booking._id || "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingHistory;