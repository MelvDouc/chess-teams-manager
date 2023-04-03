async function fetchFromApi<T>(path: `/${string}`, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1${path}`, init);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const players = {
  all: () => fetchFromApi("/joueurs")
};