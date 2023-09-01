import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";
import jsPDF from "jspdf";
function ExcelReader1() {
  const [excelData, setExcelData] = useState([]);
  const [formData, setFormData] = useState("");
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet

      // Parse the sheet data into JSON format
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Set the parsed data in state
      setExcelData(sheetData);
    };

    reader.readAsArrayBuffer(file);
  }
  const pdf = new jsPDF();
  const handleDownload = () => {
    for (let index = 0; index < excelData.length; index++) {
      const pdf = new jsPDF();

      // Customize PDF content
      const row = excelData[index];

      // Set the starting Y-coordinate for each section of the payslip
      const startY = 30 + index * 100;

      // Employee Information Section
      pdf.text(10, startY, `Name: ${row.Name}`);
      pdf.text(10, startY + 20, `Join Date: ${row.JoinDate}`);
      pdf.text(10, startY + 40, `Designation: ${row.Designation}`);
      pdf.text(10, startY + 60, `Department: ${row.Department}`);
      pdf.text(10, startY + 80, `Location: ${row.Location}`);

      pdf.text(100, startY, `Bank Name: ${""}`);
      pdf.text(100, startY + 20, `Bank Account No: ${""}`);
      pdf.text(100, startY + 40, `PF No: ${""}`);
      pdf.text(100, startY + 60, `ESI No: ${""}`);
      pdf.text(100, startY + 80, `PAN No: ${""}`);

      // Earnings Section
      // pdf.text(1000, startY, `Effective Work Days: ${row.DAYSINMONTH}`);
      // pdf.text(1000, startY + 20, `Days in Month: ${row.DA}`);
      // pdf.text(1000, startY + 40, `Basic: ${row.BASIC}`);
      // pdf.text(1000, startY + 60, `HRA: ${row.HRA}`);
      // pdf.text(1000, startY + 80, `Medical Allowance: ${row.MEDICALALLOWANCE}`);

      // Deductions Section
      // pdf.text(200, startY, `Transport Allowance: ${row.TRANSPORTALLOWANCE}`);
      // pdf.text(200, startY + 20, `Special Allowance: ${row.SpecialAllowance}`);
      // pdf.text(200, startY + 40, `Total Earnings: ${row.TOTALINR}`);
      // pdf.text(200, startY + 60, `Total Deductions: INR: ${row.TotalDeductions}`);

      // Add a separator line between employee payslips
      pdf.line(20, startY + 200, 400, startY + 200);

      // Save or initiate the download
      pdf.save("payslip.pdf");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />

      <div>
        <h2>Excel Data:</h2>
        <div class="salary-slip">
          <table className="empDetail">
            <tbody>
              {excelData.map((row, index) => (
                <React.Fragment key={index}>
                  <td colspan="4">
                    <img src="https://naukrirecruiter.naukri.com/profilePic/getpic?pid=1582718694rp2904130_medium4" style={{ width: "100px" }} />
                    <img height="90px" src="" />
                  </td>
                  <div className="column">
                    <h6 className="heading">mantra technologies Pvt.Ltd.</h6>
                    <p style={{ fontSize: "8px" }}>1st Floor,Vertex Corporate Bidg,Jubilee Enclave,HITEX Madhapur,Hyderabad-500081,p.(040)290023</p>
                    <h6 className="heading">Payslip for the month of july 2023</h6>
                  </div>
                  <tr>
                    <th>Name</th>
                    <td>{row.Name}</td>
                    <td class="myAlign"></td>
                    <th>Bank Name:</th>
                  </tr>
                  <tr>
                    <th>Join Date:</th>
                    <td>{row.JoinDate}</td>
                    <td class="myAlign"></td>
                    <th>Bank Account No:</th>

                    <td></td>
                  </tr>

                  <tr>
                    <th>Designation:</th>
                    <td>{row.Designation}</td>
                    <td class="myAlign"></td>
                    <th>PF No:</th>
                  </tr>

                  <tr>
                    <th>Department:</th>
                    <td>{row.Department}</td>
                    <td class="myAlign"></td>
                    <th>PF UAN:</th>
                  </tr>

                  <tr>
                    <th>Location:</th>
                    <td>{row.Location}</td>
                    <td class="myAlign"></td>
                    <th>ESI No:</th>
                  </tr>
                  <tr>
                    <th>Effective Work Days:</th>
                    <td>{row.DAYSINMONTH}</td>
                    <td class="myAlign"></td>
                    <th>PAN No:</th>
                  </tr>
                  <tr>
                    <th>Days in Month:</th>
                    <td>{row.DA}</td>
                    <td class="myAlign"></td>
                    <th>LOP:</th>
                  </tr>
                  {/*  */}
                  <tr class="myBackground">
                    <th colspan="2">Earanings</th>
                    <th class="table-border-right">Actual</th>
                    <th colspan="2">Deductions</th>
                    <th>Actual</th>
                  </tr>
                  <tr>
                    <th colspan="2">Basic</th>
                    <td class="myAlign">{row.BASIC}</td>
                    <th colspan="2">PF:</th>
                  </tr>
                  <tr>
                    <th colspan="2">HRA</th>
                    <td class="myAlign">{row.HRA}</td>
                    <th colspan="2">PROF TAX:</th>
                  </tr>
                  <tr>
                    <th colspan="2">MEDICALALLOWANCE</th>
                    <td class="myAlign">{row.MEDICALALO}</td>
                  </tr>
                  <tr>
                    <th colspan="2">TRANSPORTAELOWANCE</th>
                    <td class="myAlign">{row.TRANSPOTAALLOWANCE}</td>
                  </tr>
                  <tr>
                    <th colspan="2">SPECIALALLOWACE</th>
                    <td class="myAlign">{row.Status}</td>
                  </tr>
                  <tr class="myBackground">
                    <th colspan="2">Total Earanings</th>
                    <td class="myAlign">{row.TOTALINR}</td>
                    <th colspan="2">Total Deductions:INR</th>
                    <td class="myAlign">{row.Status}</td>
                    <td>{row.LOP}</td>
                  </tr>
                  <tr height="40px">
                    <th colspan="2">Net Pay the month(Total Earnings-Total Deinductions):</th>
                    {/* <th colSpan="2">Twenty Four Thousand One Hundred Forty Four</th> */}
                  </tr>
                  <tr height="42px">
                    <th colSpan="2">Twenty Four Thousand One Hundred Forty Four</th>
                  </tr>
                  <button className="btn bg-primary" style={{ marginLeft: "1500px" }} onClick={handleDownload}>
                    download
                  </button>
                  <tr className="myAlign"></tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <p>This is a system generated payslip and does not require signature</p>
          <button className="btn bg-primary" style={{ marginLeft: "50px" }} onClick={handleDownload}>
            download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExcelReader1;