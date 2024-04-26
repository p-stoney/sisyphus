import Card from "@mui/material/Card";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #eee9da !important;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;
