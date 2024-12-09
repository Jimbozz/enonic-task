import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/PersonList.sass";
import PERSON_LIST_QUERY from "../queries/PersonList";

type Photo = {
  imageUrl: string;
};

type Person = {
  _id: string;
  _name: string;
  data: {
    photos: Photo[];
  };
  displayName: string;
};

type PersonListItemProps = {
  person: Person;
};

function PersonListItem({ person }: PersonListItemProps) {
  const {
    _id,
    _name,
    data: { photos = [] },
    displayName,
  } = person;

  const imgProps = {
    alt: displayName || "Placeholder image",
    src: photos.length > 0 ? photos[0].imageUrl : "/placeholder.jpg",
  };

  return (
    <Link to={`/p/${_name}/${_id}`}>
      <figure>
        <img {...imgProps} className='persons__image' />
        <figcaption>{displayName}</figcaption>
      </figure>
    </Link>
  );
}

export function PersonList() {
  const [data, setData] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_GUILLOTINE_URL as string,
          {
            body: JSON.stringify({ query: PERSON_LIST_QUERY }),
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
  if (data?.length === 0) return <p>No persons found.</p>;

  return (
    <div className='persons'>
      {data?.map((person) => (
        <PersonListItem key={person._id} person={person} />
      ))}
    </div>
  );
}
