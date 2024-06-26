import styled from "styled-components";

interface ButtonProps {
  $fullWidth?: boolean;
}

export const ButtonWithProps = styled.button<ButtonProps>`
  background-color: #6096b4;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 1rem;
  font-size: 0.84rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-right: 0.25rem;
  cursor: pointer;
  outline: none;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: #2a7096;
  }
`;

export const Button = styled.button`
  background-color: #6096b4;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  margin-right: 0.25rem;
  outline: none;

  &:hover {
    background-color: #2a7096;
  }

  @media (max-width: 600px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.65rem;
    gap: 0.15rem;
    margin-right: 0.15rem;
  }
`;

export const PlusIcon = styled.span`
  background-color: #eee9da;
  border: 1px solid #6096b4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  color: #6096b4;
  margin-left: -0.3rem;

  @media (max-width: 600px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.85rem;
  }
`;
export const StyledBackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: bold;

  .back-text {
    margin-left: 0.1rem;
  }
`;

export const ToggleButton = styled.button<{ $status: "PAID" | "UNPAID" }>`
  background-color: ${(props) =>
    props.$status === "PAID" ? "#08c28d" : "#e89e3f"};
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 1rem;
  font-size: 0.84rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  margin-right: 0.25rem;
  outline: none;

  &:hover {
    background-color: ${(props) =>
      props.$status === "PAID" ? "#06a57d" : "#c7853c"};
  }

  @media (max-width: 600px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.65rem;
    gap: 0.15rem;
    margin-right: 0.15rem;
  }
`;

export const XIcon = styled.span<{ $status: "PAID" | "UNPAID" }>`
  background-color: #eee9da;
  border: 1px solid
    ${(props) => (props.$status === "PAID" ? "#08c28d" : "#e89e3f")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 1.1rem;
  color: ${(props) => (props.$status === "PAID" ? "#08c28d" : "#e89e3f")};
  margin-left: -0.3rem;

  @media (max-width: 600px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.85rem;
  }
`;
