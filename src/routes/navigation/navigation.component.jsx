import { Outlet } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { ReactComponent as PencilLogo } from "../../asset/pencil-svgrepo-com.svg";
import { UserContext } from "../../context/user-context";
import AuthService from "../../utils/AuthService";
import LogoImg from "../../asset/BookLogo.png";
import LoginPage from "../login-page";
import {
  NavbarLinkContainer,
  NavbarContainer,
  RightContainer,
  LeftContainer,
  NavbarExtendedContainer,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
  NavbarInnerContainer,
  NavbarLink,
} from "./navigation.styles";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [extendNavbar, setExtendNavbar] = useState(false);
  useEffect(() => {
    if (currentUser) {
      // if a current user is loged in
      // we retrieved its info from context and check the role of the user
      // base on these flags we deterement which Link to render
      const role = currentUser.roles[0];
      if (role === "ROLE_AUTHOR") {
        setIsAuthor(true);
      } else if (role === "ROLE_EDITOR") {
        setIsEditor(true);
      } else if (role === "ROLE_MANAGER") {
        setIsManager(true);
      }
    } else {
      // if the current user is null, which means the website is in a logged out status
      // so we reset all these status to false
      setIsAuthor(false);
      setIsManager(false);
      setIsEditor(false);
    }
  }, [currentUser]);

  return (
    <Fragment>
      <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
          <LeftContainer>
            <NavbarLinkContainer>
              <Logo src={LogoImg}></Logo>
              {currentUser && (
                <NavbarLink to="/profile"> My Profile</NavbarLink>
              )}
              {isAuthor && (
                <NavbarLink to="/author/products">My Products</NavbarLink>
              )}
              {isEditor && (
                <NavbarLink to="/editor/products">Editing Products</NavbarLink>
              )}
              {isManager && (
                <NavbarLink to="/manager/products">All Products</NavbarLink>
              )}
              {isManager && (
                <NavbarLink to="/manager/user">All Users</NavbarLink>
              )}

              <OpenLinksButton
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
              </OpenLinksButton>
            </NavbarLinkContainer>
          </LeftContainer>
          <RightContainer>
            <NavbarLinkContainer>
              {currentUser ? (
                <NavbarLink as={"span"} onClick={AuthService.signOut}>
                  SIGN OUT
                </NavbarLink>
              ) : (
                <NavbarLink to="/login-page">SIGN IN</NavbarLink>
              )}
              <NavbarLink to="/about">About Us</NavbarLink>
            </NavbarLinkContainer>
          </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer>
            <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
            <NavbarLinkExtended to="/products"> Products</NavbarLinkExtended>
            <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
            <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
