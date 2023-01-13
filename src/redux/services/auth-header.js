export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  if (user && token) {
    return { Authorization: 'Bearer ' + token.token ,
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/json, text/plain,",
      // "Access-Control-Allow-Origin": "",
      "Content-type": "application/json; charset=UTF-8;",
    },
  };
  } else {
    return {};
  }
}

