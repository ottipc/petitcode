import styled from 'styled-components'

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`

export const TimelineEntry = styled.div`
  position: relative;
  padding: 0 ${(props) => props.theme.spacings.s2}
    ${(props) => props.theme.spacings.s2};
  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    top: -4px;
    right: ${(props) => props.theme.spacings.s1};
    width: 38px;
    height: 38px;
    border-radius: 100%;
    border: 7px solid white;
    background: ${({ theme }) => theme.colors.black};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13.18 8'%3e%3cpath fill='none' stroke='white' stroke-width='2' d='M.7.7L6.6 6.6 12.47.71'/%3e%3c/svg%3e");
    background-position: center 9px;
    background-repeat: no-repeat;
    background-size: 12px auto;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  }
  &:not(:last-child):after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: calc(${(props) => props.theme.spacings.s1} + 10px);
    width: 20px;
    background: ${({ theme }) => theme.colors.black};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 50%;
    padding: 0 ${(props) => props.theme.spacings.s6}
      ${(props) => props.theme.spacings.s4};
    text-align: right;
    &:before {
      right: -19px;
    }
    &:not(:last-child):after {
      right: -10px;
    }
    &:nth-child(2n) {
      margin-left: 50%;
      text-align: left;
      &:before {
        left: -19px;
        right: auto;
      }
      &:after {
        left: -10px;
        right: auto;
      }
    }
  }
`
