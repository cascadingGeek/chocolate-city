const baseURL = "https://jsonplaceholder.typicode.com";

/****************** FETCH ALL ARTISTS ******************/

export const fetchArtists = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${baseURL}/users`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
};
