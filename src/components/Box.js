import React from "react";
import { useDrag } from "react-dnd";
import Card from "react-bootstrap/Card";

const Box = ({
  name,
  image_url,
  rating,
  price,
  location,
  url,
  type,
  zIndex,
  isDropped,
  yesIsDropped,
}) => {
  const hidden = {
    display: "hidden",
  };

  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });
  if (isDropped || yesIsDropped) {
    return <div ref={drag} style={{ ...hidden, opacity }}></div>;
  } else {
    return (
      <div ref={drag}>
        <Card key={name} id="card" style={{ width: "100%", zIndex: {zIndex}}}>
          <Card.Img
            variant="top"
            id="img"
            style={{ width: "100%", height: "auto" }}
            src={image_url}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Rating: {rating} &nbsp; Price: {price}
            </Card.Subtitle>
            <Card.Text>{location}</Card.Text>
            <Card.Link href={url}>Yelp</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
};

export default Box;
