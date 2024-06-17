import data from "../data/data.json";

export const VtoTable = () => {
  const columns = [
    "Número cliente", 
    "Descripción cliente", 
    "Tipo documento", 
    "Referencia", 
    "Fecha Factura", 
    "F Vto", 
    "Días por vencer", 
    "Número de orden venta", 
    "Descripción código categoría",
    "Importe pendiente", 
    "Estado",
  ];

  const calculateDaysToDue = (fVto) => {
    const today = new Date();
    const [day, month, year] = fVto.split('/');
    const dueDate = new Date(`${year}-${month}-${day}`);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBackgroundColor = (days) => {
    if (days > 4) {
      return 'green';
    } else if (days > 0 && days <= 4) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const getState = (days) => {
    if (days > 4) {
      return 'VIGENTE';
    } else if (days > 0 && days <= 4) {
      return 'POR VENCER';
    } else {
      return 'VENCIDO';
    }
  };

  const getStateBackgroundColor = (days) => {
    if (days > 4) {
      return 'green';
    } else if (days > 0 && days <= 4) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const filteredData = data
    .filter(row => row.tipoDocumento === "Factura" && row.importePendiente !== 0 && row.importePendiente !== "")
    .sort((a, b) => {
      const [dayA, monthA, yearA] = a.fechaFactura.split('/');
      const [dayB, monthB, yearB] = b.fechaFactura.split('/');
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateA - dateB;
    });

  return (
    <div className="m-4">
      <h2 className="my-4 text-white">Vencimientos de Facturas</h2>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.numeroCliente}</td>
                <td>{row.descripcionCliente}</td>
                <td>{row.tipoDocumento}</td>
                <td>{row.referencia}</td>
                <td>{row.fechaFactura}</td>
                <td>{row.fVto}</td>
                <td style={{ backgroundColor: getBackgroundColor(calculateDaysToDue(row.fVto)), textAlign: 'center' }}>
                  {calculateDaysToDue(row.fVto)}
                </td>
                <td>{row.numeroOrdenVenta}</td>
                <td>{row.descripcionCodigoCategoria10}</td>
                <td>{row.importePendiente}</td>
                <td style={{ backgroundColor: getStateBackgroundColor(calculateDaysToDue(row.fVto)), textAlign: 'center' }}>
                  {getState(calculateDaysToDue(row.fVto))}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
