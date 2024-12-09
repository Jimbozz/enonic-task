import type { ImageComponent } from "@enonic/react-components";

export const Image: ImageComponent = ({
  alt,
  image,
  imageStyle,
  sizes,
  src,
  srcSet,
  style,
  ...rest
}) => {
  return (
    <img alt={alt} sizes={sizes} src={src} srcSet={srcSet} style={style} />
  );
};
