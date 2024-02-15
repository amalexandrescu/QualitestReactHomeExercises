import { FC, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import UserCard from "../UserCard/UserCard";
import { useAppSelector } from "../../redux/store/store";

const Slideshow: FC = () => {
  const users = useAppSelector((state) => state.users.data);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);

  useEffect(() => {
    if (!isSlideshowRunning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isSlideshowRunning, users.length]);

  const toggleSlideshow = () => {
    setIsSlideshowRunning(!isSlideshowRunning);
  };

  return (
    <>
      <div>
        <div>
          <Button
            ariaLabel="Start Slideshow"
            variant="primary"
            onClick={toggleSlideshow}
          >
            {!isSlideshowRunning ? "Start slideshow" : "Stop slideshow"}
          </Button>
        </div>
      </div>

      {users.length > 0 && (
        <UserCard
          image={users[currentIndex].image}
          firstName={users[currentIndex].firstName}
          lastName={users[currentIndex].lastName}
        />
      )}
      <div>{`${currentIndex + 1}/${users.length}`}</div>
    </>
  );
};

export default Slideshow;
