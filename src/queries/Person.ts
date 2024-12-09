const query = `query PersonQuery($personId: ID!) {
  guillotine {
    get(key: $personId) {
      _name
      displayName
      ... on com_enonic_app_intro_Person {
        data {
          dateofbirth
          photos {
            ... on media_Image {
              imageUrl(scale: "width(1000)", type: absolute)
              attachments {
                name
              }
            }
          }
          bio(processHtml: {type: absolute}) {
            processedHtml
            links {
              ref
              media {
                content {
                  _id
                }
              }
              content {
                _id
                _name
                type
              }
            }
            images {
              ref
              image {
                _id
              }
            }
            macros {
              ref
              name
              descriptor
              config {
                factbox {
                  header
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default query;
