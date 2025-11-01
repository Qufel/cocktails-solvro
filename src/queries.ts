export const getCocktails = async (
  page: number = 1,
  perPage: number = 15,
  category: string | null = null,
  glass: string | null = null
) => {
  let url: string = `https://cocktails.solvro.pl/api/v1/cocktails?page=${page}&perPage=${perPage}`;
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (glass) {
    url += `&glass=${encodeURIComponent(glass)}`;
  }
  return fetch(url).then((res) => res.json());
};

export const getCategories = async () => {
  return fetch("https://cocktails.solvro.pl/api/v1/cocktails/categories").then(
    (res) => res.json()
  );
};

export const getGlasses = async () => {
  return fetch("https://cocktails.solvro.pl/api/v1/cocktails/glasses").then(
    (res) => res.json()
  );
};
