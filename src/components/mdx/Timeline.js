import styled from 'styled-components'

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`

export const TimelineEntry = styled.div`
  position: relative;
  padding: 0 ${(props) => props.theme.spacings.s6}
    ${(props) => props.theme.spacings.s2} 0;

  & h2 {
    margin-top: ${(props) => props.theme.spacings['s0.25']};
    margin-bottom: ${(props) => props.theme.spacings['s0.75']};
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    top: -4px;
    right: ${(props) => props.theme.spacings.s2};
    transform: translateX(25%);
    width: 42px;
    height: 42px;
    border-radius: 100%;
    border: 8px solid white;
    background: ${({ theme }) => theme.colors.black};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 117 63'%3e%3cpath fill='white' d='M1.7 7.4A4 4 0 0 1 .5 4.5a4.1 4.1 0 0 1 7-2.9l51 51 51-51a4.1 4.1 0 0 1 5.8 5.8L61.4 61.3a4.1 4.1 0 0 1-5.8 0L1.7 7.4z'/%3e%3c/svg%3e");

    background-position: center center;
    background-repeat: no-repeat;
    background-size: 12px auto;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.21) 0px 3px 5px;
  }
  &:not(:last-child):after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: calc(${(props) => props.theme.spacings.s1} + 12px);
    width: 24px;
    background: ${({ theme }) => theme.colors.black};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 50%;
    padding: 0 0 ${(props) => props.theme.spacings.s4};
    padding-right: ${(props) => props.theme.spacings.s4};
    text-align: right;
    &:before {
      right: -21px;
      transform: none;
    }
    &:not(:last-child):after {
      right: -12px;
    }
    &:nth-child(2n) {
      padding-left: ${(props) => props.theme.spacings.s4};
      padding-right: 0;
      margin-left: 50%;
      text-align: left;
      &:before {
        left: -21px;
        right: auto;
      }
      &:after {
        left: -12px;
        right: auto;
      }
    }
  }
`
