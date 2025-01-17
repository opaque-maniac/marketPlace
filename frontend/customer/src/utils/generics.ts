interface Meta extends ImportMeta {
  env: {
    API_HOSTNAME?: string;
    API_PROTOCOL?: string;
  };
}

const meta = import.meta as Meta;
export const apiHost = meta.env.API_HOSTNAME || "localhost:3020";
export const apiProtocol = meta.env.API_PROTOCOL || "http";
