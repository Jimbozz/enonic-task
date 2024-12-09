const query = `query MovieListQuery {
  guillotine {
    queryDsl(
      first: 50
      query: {term: {field: "type", value: {string: "com.enonic.app.intro:movie"}}}
      sort: {field: "modifiedTime", direction: DESC}
    ) {
      _id
      _name
      displayName
      type
      ... on com_enonic_app_intro_Movie {
        data {
          photos {
            ... on media_Image {
              imageUrl(type: absolute, scale: "square(500)")
            }
          }
        }
      }
    }
  }
}`;

export default query;
