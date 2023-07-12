type Post = {
  id: string;
  userId: string;
  text: string;
  date: string;
};

type UserPost = {
  id: string;
  name: string;
  email: string;
  url: string;
};

type PostAllInfo = {
  id: string;
  user: UserPost;
  text: string;
  date: string;
};
