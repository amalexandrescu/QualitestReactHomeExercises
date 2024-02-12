import { FC } from "react";
import { CardContainer, UserImage, UserInfo } from "./styles";

interface IUserCardProps {
  image: string;
  firstName: string;
  lastName: string;
}

const UserCard: FC<IUserCardProps> = ({ image, firstName, lastName }) => {
  return (
    <CardContainer>
      <UserImage src={image} alt="user image" />
      <UserInfo>{`${firstName} ${lastName}`}</UserInfo>
    </CardContainer>
  );
};

export default UserCard;
