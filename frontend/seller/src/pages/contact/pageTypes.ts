export interface ContactResults {
  message: string;
  complaint: {
    id: string;
    email: string;
    name: string;
    phone: string;
    message: string;
    status: string;
    dateCreated: string;
    staffId: string | null;
    dateResovled: string | null;
  };
}

export interface ContactFormData {
  [k: string]: FormDataEntryValue;
}
