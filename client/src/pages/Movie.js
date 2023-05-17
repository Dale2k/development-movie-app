import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ReviewsList from "../components/ReviewsList";
import ReviewForm from "../components/ReviewForm";

import { QUERY_SINGLE_MOVIE } from "../utils/queries";

const Movie = () => {
  // Use `useParams()` to retrieve value of the route parameter `:movieId`
  const { movieId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MOVIE, {
    // pass URL parameter
    variables: { movieId: movieId },
  });

  const movie = data?.movie || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">{data.title} Movie Reviews</h2>

      {movie.reviews?.length > 0 && <ReviewsList reviews={movie.reviews} />}

      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <ReviewForm movieId={movie._id} />
      </div>
    </div>
  );
};

export default Movie;