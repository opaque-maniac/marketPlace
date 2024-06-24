import { ContactFormData, ContactResults } from "./pageTypes";

const submitContactForm = async (data: ContactFormData) => {
  const url = "http://localhost:3001/complaints/submit";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);

  const result = (await response.json()) as ContactResults;

  return result;
};

export default submitContactForm;
