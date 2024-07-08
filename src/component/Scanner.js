// import { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// function Scanner() {
//   const [scanResult, setScanResult] = useState(null);
//   let scanner; // Define scanner variable outside useEffect

//   useEffect(() => {
//     scanner = new Html5QrcodeScanner(
//       "reader",
//       {
//         qrbox: {
//           width: 250,
//           height: 250,
//         },
//         fps: 5,
//       },
//        false
//     );

//     scanner.render(onScanSuccess, onScanError);

//     return () => {
//       scanner.clear();
//     };
//   }, []);

//   const onScanSuccess = (result) => {
//     scanner.clear();
//     setScanResult(result);
//   };

//   const onScanError = (error) => {
//     console.warn("QR Code scan error:", error);
    
//   };

//   return (
//     <div id="reader">
//       {scanResult ? (
//         <div>
//           Success: <a href={"http://" + scanResult}>{scanResult}</a>
//         </div>
//       ) : (
//         <div>No QR code scanned yet.</div>
//       )}
//     </div>
//   );
// }

// export default Scanner;



import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  let scanner;
  useEffect(() => {
    const config = {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      preferredFacingMode: "environment", 
    };

    scanner = new Html5QrcodeScanner("reader", config);

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, []);

  const onScanSuccess = (result) => {
    scanner.clear();
    setScanResult(result);
  };

  const onScanError = (error) => {
    console.warn("QR Code scan error:", error);
    // Handle error as needed
  };

  return (
    <div id="reader">
      {scanResult ? (
        <div>
          Success: <a href={"http://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div>No QR code scanned yet.</div>
      )}
    </div>
  );
}

export default Scanner;
