import { useNavigate } from "react-router-dom";
import '../styles/clientsTable.css'

export const ClientsTable = () => {
  const navigate = useNavigate();

  const handleNavigate = (location) => {
    navigate(location);
  };
  return (
    <div>
      <h2 className="mt-4 px-5">Clientes de Juan Cisint</h2>
      <div className="mt-4 px-5">
        <table style={{background: "#8b0d70"}} className="table">
          <thead>
            <tr>
              <th scope="col">Numero de cliente</th>
              <th scope="col">Descripcion de cliente</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1100123</td>
              <td>Aliados SRL</td>
              <td><button className="btn button" onClick={() => handleNavigate("/registros")}>VER REGISTROS</button></td>
            </tr>
            <tr>
              <td>1100124</td>
              <td>Jimbo</td>
              <td><button className="btn button">VER REGISTROS</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}