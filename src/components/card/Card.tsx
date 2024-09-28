import { useEffect, useState } from "react";
import "./card.scss";
import LoadingBar from "../LoadingBar/LoadingBar";

interface Props {
  title: string;
  data: string|number;
}

const Card = (props: Props) => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });

  return (
    <div className="card">
      {loader ? (
        <LoadingBar height="100%" />
      ) : (
        <div>
          <h3>${props.data}</h3>
          <h6>{props.title.toUpperCase()}</h6>
        </div>
      )}
    </div>
  );
};

export default Card;
