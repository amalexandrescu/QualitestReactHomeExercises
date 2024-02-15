import { FC, useState } from "react";
import {
  InputFieldContainer,
  InputValueExceededError,
  StyledInput,
} from "./styles";
import { UserEssentialInfo } from "../../pages/types";
import { useAppSelector } from "../../redux/store/store";

interface IInputProps {
  value: number | undefined;
  error: string | undefined;
  onChange: (value: string) => void;
}

export const Input: FC<IInputProps> = ({ value, onChange, error }) => {
  const users = useAppSelector((state: any) => state.users.data);

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
