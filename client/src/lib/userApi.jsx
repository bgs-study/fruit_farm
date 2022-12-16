import axios from "axios";
// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  const res = await axios(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: bodyData,
  });

  console.log("데이터 받음", res);

  return res;
}

export { post };