import { Container } from "../../../../components/container/container";
import { Me } from "../../../../components/me/me";
import { NewPost } from "../../../../components/new-post/new-post";
import { Post } from "../../../../components/post/post";
import { useRedirectIfNotLogged } from "../../../../hooks/redirect-if-not-logged-in/useRedirectIfNotLoggedIn";

const Blog = () => {
  useRedirectIfNotLogged();

  return (
    <Container>
      <Me />
      <NewPost />
      <Post />
    </Container>
  );
};

export default Blog;
