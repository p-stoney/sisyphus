import React, { type ReactNode } from "react";
import styled from "styled-components";

const ListItemContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.95rem;
  margin-bottom: 0.5rem;
  background-color: #eee9da;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 600px) {
    /* Adjust the breakpoint as needed */
    justify-content: space-between;
  }
`;

interface ListItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ children, onClick }) => {
  return <ListItemContainer onClick={onClick}>{children}</ListItemContainer>;
};

interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function List<T>({ data, renderItem }: ListProps<T>) {
  return <div>{data.map(renderItem)}</div>;
}
