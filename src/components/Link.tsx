import type { LinkComponent } from "@enonic/react-components";

export const Link: LinkComponent = ({
  children,
  content,
  media,
  href,
  target,
  title,
  uri,
  ...rest
}) => {
  let appHref = "";
  if (content && content.type?.endsWith(":person")) {
    appHref = `/p/${content?._name}/${content?._id}`;
  } else if (media?.content) {
    appHref = href;
  } else {
    return <>{children}</>;
  }

  return (
    <a href={appHref} target={target} title={title}>
      {children}
    </a>
  );
};
