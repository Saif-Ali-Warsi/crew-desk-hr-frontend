import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  companyName: string;
}

function Header({ companyName }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <>
      <header>{companyName}</header>
      {user && <button onClick={logout}>Logout</button>}
    </>
  );
}

export default Header;
