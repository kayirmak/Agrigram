import axios from "axios";

import { commands } from "./commands";

const baseUrl = "https://kurjun-ex.kg/kurjun/api/";

const sendRequest = (cmd, body = null, id, headers) => {
  return new Promise((resolve, reject) => {
    const command = commands[cmd];
    const reqId = id ? (!id.toString().includes("?") ? id + "/" : id) : "";

    let url = baseUrl + command.url + reqId;

    axios({
      url,
      method: command.method,
      data: body,
      headers: headers,
      responseType: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((result) => {
        reject(result);
      });
  });
};

export default sendRequest;
