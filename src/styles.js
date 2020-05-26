import styled from "styled-components";

export const Buttons = styled.button`
  width: 7.5vw;
  height: 3.75vh;
  background-color: #add4dd;
  margin: 0 1vw 0 1vw;
`;

export const Cells = styled.div`
  width: 1.5vw;
  height: 3vh;
  border-radius: 1vw;
  margin: 0 0.5vw 0.5vh 0.5vw;
  background-color: ${(props) => (props.state ? "blue" : undefined)};
  border: solid 1px black;
`;

export const GridCage = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: repeat(${(props) => props.Cols}, 1.9vw);
`;
