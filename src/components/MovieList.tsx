import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MOVIE_LIST_QUERY from "../queries/MovieList";
import "../styles/MovieList.sass";

type Photo = {
  imageUrl: string;
};

type Movie = {
  _id: string;
  _name: string;
  data: {
    photos: Photo[];
  };
  displayName: string;
};

type MovieListItemProps = {
  movie: Movie;
};
function MovieListItem({ movie }: MovieListItemProps) {
  const {
    _id,
    _name,
    data: { photos = [] },
    displayName,
  } = movie;

  const imgProps = {
    alt: displayName || "Placeholder image",
    src: photos.length > 0 ? photos[0].imageUrl : "/placeholder.jpg",
  };
  return (
    <Link to={`/m/${_name}/${_id}`}>
      <figure>
        <img {...imgProps} className='movies__image' />
        <figcaption>{displayName}</figcaption>
      </figure>
    </Link>
  );
}

export function MovieList() {
  const [data, setData] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_GUILLOTINE_URL as string,
          {
            body: JSON.stringify({
              query: MOVIE_LIST_QUERY,
            }),
            headers: { "content-type": "application/json" },
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json?.data?.guillotine?.queryDsl || []);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  if (!data && !error) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data?.length === 0) return <p>No Movies found.</p>;

  return (
    <div className='movies'>
      {data?.map((movie) => (
        <MovieListItem key={movie._id} movie={movie} />
      ))}
    </div>
  );
}
