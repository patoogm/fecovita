import data from "../data/data.json";
import '../styles/vtoTable.css'

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

  const calculateTotals = (filteredData) => {
    let totalVigente = 0;
    let totalPorVencer = 0;
    let totalVencido = 0;
    let totalPendiente = 0;

    filteredData.forEach(row => {
      const days = calculateDaysToDue(row.fVto);
      const importe = parseFloat(row.importePendiente.replace(/[^0-9,-]/g, '').replace(',', '.'));

      if (days > 4) {
        totalVigente += importe;
      } else if (days > 0 && days <= 4) {
        totalPorVencer += importe;
      } else {
        totalVencido += importe;
      }

      totalPendiente += importe;
    });

    return { totalVigente, totalPorVencer, totalVencido, totalPendiente };
  };

  const { totalVigente, totalPorVencer, totalVencido, totalPendiente } = calculateTotals(filteredData);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between">
        <h3 className="">Vencimientos de Facturas</h3>
        <div className="d-flex">
          <div>
            <h4 className="text m-3 p-2">Vigentes: $ {totalVigente.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
            <h4 className="text m-3 p-2">Por vencer: $ {totalPorVencer.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
          <div>
            <h4 className="text m-3 p-2">Vencidas: $ {totalVencido.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
            <h4 className="text m-3 p-2">Total pendiente: $ {totalPendiente.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
        </div>
      </div>
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
