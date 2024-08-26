import {
  CompaintData,
  ErrorResponse,
  SuccessComplaintResponse,
} from "../types";

export const sendContact = async (formData: CompaintData) => {
  try {
    const url = "http://localhost:3020/complaints";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const obj = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(obj));
    }

    const data = (await response.json()) as SuccessComplaintResponse;
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
