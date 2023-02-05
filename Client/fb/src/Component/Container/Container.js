import React from "react";
import "./Container.css";
const Container = ({ price, title, id, image }) => {
  return (
    <div className="container">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="content">
        <h1>
          <label>Title:</label>
          {title}
        </h1>
        <p>
          <label>Id: </label>
          {id}
        </p>
        <p>
          <label>Price: </label>
          {price}
        </p>
      </div>
    </div>
  );
};
export default Container;
