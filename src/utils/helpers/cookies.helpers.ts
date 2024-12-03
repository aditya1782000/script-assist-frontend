import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string | number) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 15);

  cookies.set(key, value, { expires });
};

export const getCookie = (key: string) => cookies.get(key);

export const removeCookie = (key: string) => cookies.remove(key);

export const getUserId = () => getCookie('__userId');

export const setUserId = (userId: string) => setCookie('__userId', userId);

export const getToken = () => getCookie('__token')?.replaceAll('%20', '');

export const removeToken = () => removeCookie('__token');

export const setToken = (token: string) =>
  setCookie('__token', `%20${token}%20`);

export const clearCookies = () => {
  const allCookies = cookies.getAll();

  for (const cookie in allCookies) {
    cookies.remove(cookie);
  }
};
