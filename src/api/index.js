import initRequest from "@/utils/request";

export const { get, post } = initRequest(import.meta.env, {
  handleReq: (request) => {
    request.headers["Token"] = "thisIsTokenValue";
    request.headers["TGG-System-Name"] = "TGG";
  },
});
