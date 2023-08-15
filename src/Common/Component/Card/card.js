import React, { useState } from "react";
import {
  CardContainer,
  CardImage,
  Overlay,
  OverlayContent,
  OverlayButton,
  CardTitle,
} from "./cardStyled";

const CardWithOverlay = ({ imageSrc, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <CardContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardImage src={imageSrc} alt={title} />
      {isHovered && (
        <Overlay>
          <OverlayContent>
            <OverlayButton>Like</OverlayButton>
            <OverlayButton>Heart</OverlayButton>
          </OverlayContent>
        </Overlay>
      )}
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
};

export default CardWithOverlay;
