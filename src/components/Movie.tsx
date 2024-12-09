import { useEffect, useState } from "react";
import MOVIE_QUERY from "../queries/Movie";
import { Link as RouterLink, useParams } from "react-router-dom";
import styles from "./Movie.module.css";

interface MovieData {
  _id: string;
  _name: string;
  data: {
    photos: { imageUrl: string; _id: string }[];
    abstract: string;
  };
  displayName: string;
  subtitle: string;
  cast: {
    actor: {
      _id: string;
      displayName: string;
    };
    character: string;
  };
}
export default function Movie() {
  const { movieId } = useParams<{ movieId: string }>();
  const guillotineUrl = import.meta.env.VITE_GUILLOTINE_URL as string;
  const [data, setData] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(guillotineUrl, {
        body: JSON.stringify({
          query: MOVIE_QUERY,
          variables: { movieId },
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });

      const json = await response.json();
      const value = json?.data?.guillotine?.get;

      if (value) {
        setData(value as MovieData);
      }
    };
    fetchData();
  }, [guillotineUrl, movieId]);

  if (!data) return null;

  const {
    data: { photos, abstract },
    displayName,
  } = data;

  return (
    <>
      <div className={styles.wrapper}>
        <RouterLink to='/m' className='button'>
          &#8592; Back to Movies
        </RouterLink>
        <div className={styles.containerMargin}>
          <h2>{displayName}</h2>
          <article>{abstract}</article>
        </div>
        <div className={styles.containerMargin}>
          {photos.length > 0 && <h4>Photos</h4>}
          <div className={styles.photos}>
            {photos.map((photo) => (
              <figure key={photo._id}>
                <img
                  className={styles.photo}
                  src={photo.imageUrl}
                  title={displayName}
                  alt={displayName}
                  width='500'
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
