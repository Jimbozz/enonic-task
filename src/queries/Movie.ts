const query = `query MovieQuery($movieId: ID!) {
  guillotine {
    get(key: $movieId) {
      _name
			_id
      displayName
      ... on com_enonic_app_intro_Movie {
        data {
          subtitle
          director {
            _id
            displayName
          }
          photos {
						_id
            ... on media_Image {
              imageUrl(scale: "width(1000)", type: absolute)
              attachments {
                name
              }
            }
          }
          abstract
					cast {
						actor {
							_id
							displayName
						}
						character
					}
        }
      }
    }
  }
}`;

export default query;
