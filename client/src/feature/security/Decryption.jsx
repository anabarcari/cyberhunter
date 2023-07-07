import { useState } from "react";
import { notification } from "../../util/notification";
import { decryptFileApi } from "../../service/api";

const Decryption = () => {
  const [file, setFile] = useState(null);
  const [downloadFile, setDownloadFile] = useState(null);
  const [secretKey, setSecretKey] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleDecryption = async () => {
    if (secretKey?.length !== 32) {
      notification.error("secret key must be equal to 32 characters");
      return;
    }
    if (!file) {
      notification.error("you need to add a file");
      return;
    }

    try {
      const payload = { file, key: secretKey };
      const response = await decryptFileApi(payload);
      console.log("response", response);
      setDownloadFile(response);
    } catch (error) {
      console.log("Error", error);
      notification.error("exception");
    }
  };

  const handleDownload = async () => {
    downloadFile.blob().then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <h5 style={{ fontSize: "50px", textShadow: "10px 10px 15px", color: "black" }}>File Decryption</h5>
      <hr></hr>

      <div className="mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          id="secret-key"
          placeholder="Secret key"
          name="secret-key"
          value={secretKey}
          onChange={(event) => setSecretKey(event.target.value)}
        />
      </div>

      <div className="mb-3 mt-3">
        <input
          type="file"
          className="form-control"
          id="file"
          placeholder="File"
          name="file"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-3 mt-3">
        <button className="btn btn-secondary" onClick={handleDecryption}>
          Decrypt
        </button>

        <button className="btn btn-secondary" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Decryption;
