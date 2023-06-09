import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useAuthContext from '../hooks/useAuthContext';

const UserMenu = (props) => {
  const { showUserMenu, setShowUserMenu } = props;
  const { user, signOut } = useAuthContext();
  const { firstName, lastName, username, email } = user || {};
  const navigate = useNavigate();

  function logOut() {
    setShowUserMenu(false);
    signOut();
    navigate('/');
  }

  return (
    <UserMenuWrapper showUserMenu={showUserMenu}>
      <div>
        <span>
          Signed in as <b>{username}</b>
        </span>
        <span>{`${firstName} ${lastName}`}</span>
        <span>{email}</span>
        <span className="action">Edit</span>
        <span className="action no-border" onClick={logOut}>
          Sign out
        </span>
      </div>
    </UserMenuWrapper>
  );
};

const UserMenuWrapper = styled.div`
  position: relative;
  line-height: normal;
  cursor: auto;
  top: -10px;
  right: 50px;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0s, opacity 200ms linear;

  ${(props) =>
    props.showUserMenu &&
    css`
      opacity: 1;
      visibility: visible;
    `}
  div {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #2f2f2f;
    border: 1px solid #4b4b4b;
    border-radius: 5px;
    padding: 0 10px 0 10px;
  }

  span {
    color: white;
    font-size: 13px;
    padding-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    border-bottom: 1px solid #4b4b4b;
  }

  .action {
    text-decoration: underline;
    cursor: pointer;
  }

  .no-border {
    border-bottom: none;
  }
`;

export default UserMenu;
