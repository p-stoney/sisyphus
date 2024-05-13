import styled from "styled-components";

interface CommonRightCaretProps {
  onClick?: () => void;
  alt: string;
}

const RightCaretStyled = styled.img`
  width: 0.9rem;
  height: 0.9rem;
  align-self: center;
  margin-left: 0.5rem;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 0.75rem;
    font-size: 0.75rem;
    margin-left: 0.25rem;
    margin-right: 0.15rem;
  }
`;

export const RightCaret: React.FC<CommonRightCaretProps> = ({
  onClick,
  alt,
}) => <RightCaretStyled src={"/right-caret.svg"} onClick={onClick} alt={alt} />;
