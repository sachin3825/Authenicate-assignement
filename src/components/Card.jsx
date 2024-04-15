import React from "react";
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const Card = ({ movie, isInWatchList, onAdd, onRemove }) => {
  const imdbRating = movie.Ratings.find(
    (r) => r.Source === "Internet Movie Database"
  )?.Value;
  const imdbRatingValue = imdbRating
    ? parseFloat(imdbRating.split("/")[0])
    : null;

  const ratingEmoji =
    imdbRatingValue >= 7 ? "😃" : imdbRatingValue >= 4 ? "😐" : "😡";

  const imdbRatingScore = imdbRatingValue
    ? `${(imdbRatingValue * 10).toFixed(0)}/100`
    : "N/A";

  return (
    <div className='max-w-xs max-h-maxContent rounded-md shadow-lg overflow-hidden bg-white relative'>
      <img
        src={movie.Poster}
        alt={`Poster of ${movie.Title}`}
        className='w-full h-auto object-fill'
      />
      <div className='p-4 h-maxContent flex flex-col justify-between'>
        <div>
          <h3 className='text-lg font-semibold flex justify-between'>
            {movie.Title}{" "}
            <div>
              <span className='text-xl self-end'>{ratingEmoji}</span>{" "}
              <span className='text-sm'>({imdbRatingScore})</span>
            </div>
          </h3>
          <p className='text-sm'>{movie.Year}</p>
          <p className='text-sm overflow-ellipsis '>{movie.Plot}</p>
        </div>

        {isInWatchList ? (
          <button
            className='absolute top-2 right-2 active:scale-75 transition-all delay-75'
            onClick={() => onRemove()}
          >
            <MdDeleteForever size={24} color='red' />
          </button>
        ) : (
          <button
            onClick={() => onAdd(movie)}
            className='absolute top-2 right-2 active:scale-75 transition-all delay-75'
          >
            <BsBookmarkStarFill size={24} color='gray' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
