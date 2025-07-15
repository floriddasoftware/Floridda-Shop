export function getAuthToken() {
  const name = "authToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

export function clearAuthToken() {
  document.cookie =
    "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict;";
}