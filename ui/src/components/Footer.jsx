import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
        <span>
          ©2023 by{' '}
          <a className="font-semibold" href="#">Oleksii Zinkevych</a>
        </span>
        <span>All Rights Reserved</span>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  padding: 20px;
  margin: 0;
  background-color: #282828;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #4b4b4b;
  font-size: 14px;

  span {
    margin: 3px;
  }

  a {
    color: royalblue;
  }
`

export default Footer;