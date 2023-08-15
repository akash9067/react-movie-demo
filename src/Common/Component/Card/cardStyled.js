import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  overflow: hidden;
  border: 1px solid #ddd;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const OverlayContent = styled.div`
  display: flex;
  gap: 10px;
`;

const OverlayButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

const CardTitle = styled.div`
  padding: 10px;
  position: relative; /* Ensure title is above overlay */
  z-index: 2;
`;

export {
  CardContainer,
  CardImage,
  Overlay,
  OverlayContent,
  OverlayButton,
  CardTitle,
};
