import { useEffect, useState, useRef } from "react";
import { Input } from "../components/Input/Input";
import { PageWrapper } from "./styles";
import Slideshow from "../components/Slideshow/Slideshow";
import { StyledSpinner } from "../components/Spinner/Spinner";
import { getUsersAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/store/store";

export const Home = () => {
  const [numberOfUsersToFetch, setNumberOfUsersToFetch] = useState<number>(3);
  const isDataLoading = useAppSelector((state) => state.users.isLoading);
  const isDataFetchedError = useAppSelector((state) => state.users.error);
  const [errorInputValueExceeded, setErrorInputValueExceeded] = useState<
    string | undefined
  >(undefined);
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleInputChange = (input: string) => {
    clearTimeout(timeoutRef.current);

    setErrorInputValueExceeded(undefined);

    const value = parseInt(input, 10);
    if (isNaN(value) || value <= 0) {
      return setNumberOfUsersToFetch(0);
    }

    if (value === numberOfUsersToFetch) {
      return;
    }

    if (value > 5000) {
      setErrorInputValueExceeded("Invalid number. Maximum value allowed 5000.");
      setNumberOfUsersToFetch(0);
    }

    setNumberOfUsersToFetch(value);

    timeoutRef.current = setTimeout(() => {
      dispatch(getUsersAction(value));
    }, 500);
  };

  useEffect(() => {
    dispatch(getUsersAction(numberOfUsersToFetch));
  }, []);

  const isValidInput = numberOfUsersToFetch > 0 && numberOfUsersToFetch <= 5000;

  return (
    <PageWrapper>
      <h2>Dynamic User Showcase</h2>
      <Input
        value={numberOfUsersToFetch || undefined}
        error={errorInputValueExceeded}
        onChange={handleInputChange}
      />
      {isDataFetchedError
        ? `${isDataFetchedError}. Check your internet connection and try again.`
        : ""}
      {!isDataFetchedError && isDataLoading && isValidInput && (
        <StyledSpinner />
      )}
      {!isDataFetchedError && !isDataLoading && isValidInput && <Slideshow />}

      {/* Slideshow should be rendered here */}
    </PageWrapper>
  );
};
