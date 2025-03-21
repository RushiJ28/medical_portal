import { jwtDecode } from "jwt-decode";

export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function isTokenExpired(token) {
  if (token) {
    const decodedToken = jwtDecode(token);
    //Current time in UTC
    const currentTimeUTC = Math.floor(Date.now() / 1000);

    const expirationTimeUTC = decodedToken.exp;

    const expirationTimeFormatted = formatTime(expirationTimeUTC);
    const currentLocalTimeFormatted = formatTime(currentTimeUTC);

    console.log("Expiration Time:", expirationTimeFormatted);
    console.log("Current Time:", currentLocalTimeFormatted);

    //If expirationTimeUTC is less than currenTimeUTC, sign out the user
    return expirationTimeUTC < currentTimeUTC;
  } else {
    //If no token provided, consider it as expired
    return true;
  }
}
