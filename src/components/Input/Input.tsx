import { FC, useState } from "react";
import {
  InputFieldContainer,
  InputValueExceededError,
  StyledInput,
} from "./styles";
import { useSelector } from "react-redux";
import { UserEssentialInfo } from "../../pages/types";

interface IInputProps {
  value: number | undefined;
  error: string | undefined;
  onChange: (value: string) => void;
}

export const Input: FC<IInputProps> = ({ value, onChange, error }) => {
  const users = useSelector((state: any) => state.users);

  const [usersWithNameAndImage, setUsersWithNameAndImage] = useState<
    Array<UserEssentialInfo>
  >([]);

  return (
    <InputFieldContainer>
      <StyledInput
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter a positive number"
      />
      {error && <InputValueExceededError>{error}</InputValueExceededError>}
    </InputFieldContainer>
  );
};
