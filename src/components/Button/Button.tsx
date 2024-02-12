import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from "react";
import { StyledButton } from "./styles";
import { ButtonVariants } from "./types";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  ariaLabel: string;
  variant?: ButtonVariants;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  children,
  ariaLabel,
  variant,
  onClick,
  ...rest
}) => (
  <StyledButton
    aria-label={ariaLabel}
    variant={variant}
    onClick={onClick}
    {...rest}
  >
    {children}
  </StyledButton>
);
