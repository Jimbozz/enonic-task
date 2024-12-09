import type { RichTextData } from "@enonic/react-components";
import { RichText } from "@enonic/react-components";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import PERSON_QUERY from "../queries/Person";
import styles from "./Person.module.css";
import { Link } from "./Link";
import { Image } from "./Image";
import { Macro } from "./Macro";

interface Photo {
  imageUrl: string;
  attachments?: { name: string }[];
}

interface PersonData {
  displayName: string;
  bio: RichTextData;
  photos: Photo[];
}

export function Person() {
  const { personId } = useParams<{ personId: string }>();
  const guillotineUrl = import.meta.env.VITE_GUILLOTINE_URL as string;
  const [data, setData] = useState<PersonData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(guillotineUrl, {
        body: JSON.stringify({
          query: PERSON_QUERY,
          variables: { personId },
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });

      const json = await response.json();
      const value = json?.data?.guillotine?.get;

      if (value) {
        setData({
          displayName: value.displayName,
          bio: value.data.bio,
          photos: value.data.photos,
        });
      }
    };

    fetchData();
  }, [guillotineUrl, personId]);

  if (!data) return null;

  const { displayName, bio, photos } = data;

  return (
    <>
      <div className={styles.person}>
        <RouterLink to='/p' className='button'>
          &#8592; Back to list
        </RouterLink>
        <div className={styles.containerMargin}>
          <h2>{displayName}</h2>
          <RichText
            className={styles.bio}
            data={bio}
            tag='article'
            Link={Link}
            Image={Image}
            Macro={Macro}
          />
        </div>
        <div className={styles.containerMargin}>
          {photos && (
            <>
              <h4 className={styles.photosheader}>Photos</h4>
              <div className={styles.photos}>
                {photos.map((photo, index) => (
                  <figure key={index}>
                    <img
                      src={photo.imageUrl}
                      title={displayName}
                      alt={displayName}
                      width='500'
                    />
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
