import React from "react";
import Container from "./Container";
const Controller = ({ data }) => {
  return (
    <div>
      {data.map((data) => {
        return (
          <Container
            price={data.price}
            title={data.titles}
            id={data.id}
            key={data.id}
            image={data.image}
          />
        );
      })}
    </div>
  );
};
export default Controller;
