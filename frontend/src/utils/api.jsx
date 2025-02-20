// import axios from "axios";

export const makeGETrequest = async (url, token = "") => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //response.json() method parses the json data from the response body of the fetch API req and converts it into a JS object.
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching data", err);
    return err;
  }
};

export const makePOSTrequest = async (url, data, token = "") => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.error("Error posting data:", data);
    return err;
  }
};
