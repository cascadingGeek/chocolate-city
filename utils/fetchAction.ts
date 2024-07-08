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

/****************** FETCH ARTIST ALBUMS ******************/

export const fetchAlbums = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${baseURL}/albums`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};

/****************** FETCH ALBUM PHOTOS ******************/

export const fetchAlbumPhotos = async (albumId: number) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(
      `${baseURL}/albums/${albumId}/photos`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching album photos:", error);
  }
};

/****************** FETCH ALL TWEETS ******************/

export const fetchTweets = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${baseURL}/comments`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching tweets:", error);
  }
};

/****************** DELETE A TWEET ******************/

export const deleteTweet = async (tweetId: number) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers,
  };

  try {
    const response = await fetch(
      `${baseURL}/comments/${tweetId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error deleting tweet:", error);
    throw error;
  }
};

/****************** CREATE A TWEET ******************/

export const postTweet = async (tweetData: any) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestBody = JSON.stringify(tweetData);

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: requestBody,
  };

  try {
    const response = await fetch(`${baseURL}/comments`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error creating tweet:", error);
  }
};

/****************** UPDATE A TWEET ******************/

export const updateTweet = async (tweetId: number, tweetData: any) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(tweetData),
  };

  try {
    const response = await fetch(
      `${baseURL}/comments/${tweetId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error status - ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error updating tweet:", error);
    throw error;
  }
};
