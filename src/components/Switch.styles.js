import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Tab = styled.div`
  width: 100%;
  padding: 10px 20px;
  transition: 250ms ease;
  background: transparent;
  cursor: pointer;
  border-bottom: 1px solid #3486eb;

  display: flex;
  align-items: center;
  justify-content: space-between;

  // d6e7fb

  &.active-right {
    border-radius: 8px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid #3486eb;
    border-left: 1px solid #3486eb;
    background: #f6f9fe;
  }

  &.active-left {
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid #3486eb;
    border-right: 1px solid #3486eb;
    background: #f6f9fe;
  }
`;

export const Badge = styled.div`
  background: #eea122;
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50px;
  font-size: 10px;
  font-weight: bold;
`;
