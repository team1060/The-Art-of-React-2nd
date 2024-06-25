import { useRef } from "react";

const RefSmaple = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>RefSmaple</div>;
};

export default RefSmaple;
