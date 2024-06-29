import { LoginData, LoginResponseType } from "../pageTypes";

const submitLoginData = async (data: LoginData) => {
  const url = "http://localhost:3000/api-client/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const json = (await response.json()) as LoginResponseType;
  return json;
};

export default submitLoginData;
