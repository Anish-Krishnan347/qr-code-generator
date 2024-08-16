import { useState } from "react";
import "./App.css";

function App() {
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const getDatas = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log("data", userData);
  const generateQRCode = async () => {
    setLoading(true);
    try {
      if (userData.data === undefined || userData.size === undefined) {
        alert("fill all fields");
        return;
      } else {
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=${userData.size}x${userData.size}&data=${userData.data}`;
        setImage(qrCode);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const downloadQR = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };
  return (
    <div className="App">
      <h4>QR CODE GENERATOR</h4>
      {loading ? <p>Please wait...</p> : null}
      {img ? <img src={img} className="qr-code-image" /> : null}

      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code:
        </label>
        <input
          name="data"
          type="text"
          id="dataInput"
          onChange={getDatas}
          placeholder="Enter data for QR Code"
        />
      </div>
      <div>
        <label htmlFor="sizeInput" className="input-label">
          Image size(e.g., 150):
        </label>
        <input
          type="text"
          id="sizeInput"
          name="size"
          placeholder="Enter image size"
          onChange={getDatas}
        />
      </div>
      <div className="buttons-div">
        <button
          type="button"
          className="generate-btn"
          disabled={loading}
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>
        <button
          type="button"
          className="download-btn"
          disabled={!img}
          onClick={downloadQR}
        >
          Download QR Code
        </button>
      </div>
      <p className="footer">
        Designed by{" "}
        <a href="https://github.com/Anish-Krishnan347?tab=repositories">
          Anish Krishnan
        </a>
      </p>
    </div>
  );
}

export default App;
