import axios from "axios";

const baseUrl = "http://localhost:5002/api";

export async function loginApi(data) {
  console.log("data", data);
  const config = {
    method: "POST",
    url: `${baseUrl}/users/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  const response = await axios(config);
  return response?.data || null;
}

export async function registerUser(data) {
  console.log("data", data);
  const config = {
    method: "POST",
    url: `${baseUrl}/users`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  const response = await axios(config);
  return response?.data || null;
}

export async function encryptFileApi(payload) {
  console.log("payload", payload);
  const { file, key } = payload;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", key);
  formData.append("salt", "12345678");
  formData.append("algo", "blowfish");

  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:5002/api/security/encrypt",
    requestOptions
  );
  return response;
}

export async function decryptFileApi(payload) {
  console.log("payload", payload);
  const { file, key } = payload;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", key);
  formData.append("salt", "12345678");
  formData.append("algo", "blowfish");

  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:5002/api/security/decrypt",
    requestOptions
  );
  return response;
}

export async function fetchTableContent() {
  const config = {
    method: "GET",
    url: `${baseUrl}/table-content`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response?.data || null;
}

export async function fetchQuizzes() {
  const config = {
    method: "GET",
    url: `${baseUrl}/quiz`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response?.data || null;
}

export async function fetchQuizById(id) {
  console.log("id", id);
  const config = {
    method: "GET",
    url: `${baseUrl}/quiz/by-id/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  console.log("response?.data", response?.data);
  return response?.data || null;
}
