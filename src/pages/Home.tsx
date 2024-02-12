import { useEffect, useState, useRef } from "react";
import { Input } from "../components/Input/Input";
import { PageWrapper } from "./styles";
import { useDispatch } from "react-redux";
import Slideshow from "../components/Slideshow/Slideshow";
import { StyledSpinner } from "../components/Spinner/Spinner";
import { FetchUsersResponse } from "./types";

export const Home = () => {
  const [numberOfUsersToFetch, setNumberOfUsersToFetch] = useState<number>(3);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isDataFetchedError, setIsDataFetchedError] = useState<boolean>(false);
  const [errorInputValueExceeded, setErrorInputValueExceeded] = useState<
    string | undefined
  >(undefined);
  const dispatch = useDispatch();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleInputChange = (input: string) => {
    clearTimeout(timeoutRef.current);

    setIsDataLoading(true);
    setErrorInputValueExceeded(undefined);

    const value = parseInt(input, 10);
    if (isNaN(value) || value <= 0) {
      setIsDataLoading(false);
      return setNumberOfUsersToFetch(0);
    }

    if (value === numberOfUsersToFetch) {
      return;
    }

    setNumberOfUsersToFetch(value);

    timeoutRef.current = setTimeout(() => {
      fetchUsers(value);
    }, 500);
  };

  const fetchUsers = async (value: number) => {
    if (value <= 0 || value > 5000) {
      setIsDataLoading(false);
      setErrorInputValueExceeded("Invalid number. Maximum value allowed 5000.");
      return;
    }

    setIsDataLoading(true);
    setIsDataFetchedError(false);
    try {
      const response: Response = await fetch(
        `https://randomuser.me/api/?results=${value}`
      );
      const { results } = (await response.json()) as FetchUsersResponse;
      setIsDataLoading(false);
      setIsDataFetchedError(false);

      const fetchedUsersWithNameAndImage = results.map(({ name, picture }) => ({
        firstName: name.first,
        lastName: name.last,
        image: picture.large,
      }));

      dispatch({
        type: "FETCH_USERS",
        payload: fetchedUsersWithNameAndImage,
      });
    } catch (error) {
      setIsDataFetchedError(true);
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(numberOfUsersToFetch);
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
        ? "Error fetching users. Check your internet connection and try again."
        : ""}
      {!isDataFetchedError && isDataLoading && isValidInput && (
        <StyledSpinner />
      )}
      {!isDataFetchedError && !isDataLoading && isValidInput && <Slideshow />}

      {/* Slideshow should be rendered here */}
    </PageWrapper>
  );
};
