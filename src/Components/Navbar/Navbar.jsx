import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { token, setToken, dataProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <HeroNavbar
      className=" backdrop-blur-2xl text-white"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit navyt" to={"/"}>
            KUDO
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {token && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink
              color="foreground"
              to={"/"}
              className={({ isActive }) =>
                isActive ? `text-white` : `text-gray-400 `
              }
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              aria-current="page"
              to={"/posts"}
              className={({ isActive }) =>
                isActive ? `text-white` : `text-gray-400 `
              }
            >
              Posts
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {dataProfile ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={dataProfile.photo}
              />
            ) : (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
              />
            )}
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {token ? (
              <>
                {dataProfile && (
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{dataProfile.name}</p>
                    <p className="font-semibold">{dataProfile.email}</p>
                  </DropdownItem>
                )}

                <DropdownItem key="profile-link" as={Link} to="/profile">
                  Profile
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  className="border-t rounded-t-none"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem key="login" as={Link} to="/login">
                  Login
                </DropdownItem>
                <DropdownItem key="register" as={Link} to="/register">
                  Sign Up
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
      </NavbarContent>

      <NavbarMenu>
        {token ? (
          <>
            <NavbarMenuItem>
              <NavLink
                color="foreground"
                to={"/"}
                className={({ isActive }) =>
                  isActive ? `text-white` : `text-gray-400 `
                }
              >
                Home
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink
                aria-current="page"
                to={"/posts"}
                className={({ isActive }) =>
                  isActive ? `text-white` : `text-gray-400 `
                }
              >
                Posts
              </NavLink>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/profile"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-3 py-2 rounded-2xl flex items-center gap-2 w-full`
                    : `text-gray-400 flex items-center gap-2 w-full`
                }
              >
                Profile
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                color="primary"
                className="text-medium text-white  "
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-4 py-2 rounded-2xl flex items-center gap-2  w-full `
                    : `text-gray-400 flex items-center gap-2  w-full `
                }
              >
                Login
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-4 py-2 rounded-2xl flex items-center gap-2 w-full `
                    : `text-gray-400 flex items-center gap-2 w-full`
                }
              >
                Sign Up
              </NavLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
}
