import { RegisterData, RegisterResponseType } from "../pageTypes";

const submitRegisterData = async (data: RegisterData) => {
  const url = "http://localhost:3000/api-client/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const json = (await response.json()) as RegisterResponseType;
  return json;
};

export default submitRegisterData;
