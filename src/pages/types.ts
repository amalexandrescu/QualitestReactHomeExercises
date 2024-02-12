export type User = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
  };
};

export type UserEssentialInfo = {
  firstName: string;
  lastName: string;
  image: string;
};

export type FetchUsersResponse = {
  results: User[]
}