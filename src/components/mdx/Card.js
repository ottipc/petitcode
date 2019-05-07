import styled from 'styled-components'

export const Card = styled.section`
  padding: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.grey900};
  box-shadow: 5px 5px 0px hsla(0, 0%, 0%, 0.2);
  text-align: center;
`
export const CardImage = styled.div`
  width: 100%;
  max-width: 250px;
  overflow: hidden;
  margin: 0 auto ${({ theme }) => theme.spacings.s2};

  & img {
    border-radius: 100%;
  }
`
export const CardContent = styled.div``
