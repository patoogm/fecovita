import { useNavigate } from "react-router-dom";
import '../styles/navbar.css'

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (location) => {
    navigate(location);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => handleNavigate("/")}>Fecovita App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={() => handleNavigate("/")}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleNavigate("/vencimientos")}>Vencimientos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
