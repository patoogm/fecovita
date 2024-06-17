import data from "../data/data.json";
import React, { useState, useEffect } from "react";

export const Table = () => {
  const columns = [
    "AN8", 
    "Descripción cliente", 
    "Tipo documento", 
    "Referencia", 
    "Fecha Factura", 
    "F Vto", 
    "Numero de orden venta", 
    "Tipo doc OV", 
    "DEBE", 
    "HABER", 
    "SALDO"
  ];

  const [tableData, setTableData] = useState({ groupedData: {}, lastSaldoPerMonth: {} });
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const parseDate = (str) => {
      const [day, month, year] = str.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const processedData = data.map((row) => {
      let debe = 0;
      let haber = 0;

      const importeBruto = parseFloat(row.importeBruto.replace(/[^0-9,-]/g, '').replace(',', '.'));

      if (row.tipoDocumento === "Factura" || row.tipoDocumento === "Nota de debito") {
        debe = importeBruto;
      } else if (row.tipoDocumento === "Nota Credito MI" || row.tipoDocumento === "Efectivo no aplicado") {
        haber = importeBruto;
      }

      return {
        ...row,
        debe,
        haber,
        fechaFacturaObj: parseDate(row.fechaFactura),
      };
    });

    const sortedData = processedData.sort((a, b) => a.fechaFacturaObj - b.fechaFacturaObj);

    let acumulado = 0;
    let lastSaldoPerMonth = {};

    const finalData = sortedData.map((row) => {
      acumulado += row.debe - row.haber;
      const monthYear = `${row.fechaFacturaObj.getMonth() + 1}-${row.fechaFacturaObj.getFullYear()}`;
      lastSaldoPerMonth[monthYear] = acumulado;
      return { ...row, saldo: acumulado };
    });

    setSaldoTotal(acumulado);

    const groupedData = finalData.reduce((acc, row) => {
      const monthYear = `${row.fechaFacturaObj.getMonth() + 1}-${row.fechaFacturaObj.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(row);
      return acc;
    }, {});

    setTableData({ groupedData, lastSaldoPerMonth });
  }, []);

  return (
    <div className="m-5">
      <div className="my-3 d-flex justify-content-between">
        <h2 className="">Registros</h2>
        <h3 className="">SALDO TOTAL: $ {saldoTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
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
          {Object.keys(tableData.groupedData || {}).map((monthYear, index) => {
            const previousMonth = Object.keys(tableData.groupedData)[index - 1];
            const previousMonthSaldo = previousMonth ? tableData.lastSaldoPerMonth[previousMonth] : 0;

            return (
              <React.Fragment key={index}>
                <tr>
                  <td colSpan={columns.length - 1} style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                    {monthYear}
                  </td>
                  <td style={{ backgroundColor: previousMonthSaldo >= 0 ? 'red' : 'green', textAlign: 'left', fontWeight: "bold" }}>
                    $ {previousMonthSaldo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                {tableData.groupedData[monthYear].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.numeroCliente}</td>
                    <td>{row.descripcionCliente}</td>
                    <td>{row.tipoDocumento}</td>
                    <td>{row.referencia}</td>
                    <td>{row.fechaFactura}</td>
                    <td>{row.fVto}</td>
                    <td>{row.numeroOrdenVenta}</td>
                    <td>{row.tipoDocOV}</td>
                    <td>{row.debe !== 0 ? `$ ${row.debe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</td>
                    <td>{row.haber !== 0 ? `$ ${row.haber.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</td>
                    <td style={{ backgroundColor: row.saldo >= 0 ? 'red' : 'green' }}>$ {row.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
