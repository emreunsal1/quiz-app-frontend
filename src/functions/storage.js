const TOKEN_LOCALSTROGE_NAME = "token";

export const getToken = () => {
  try {
    const local = localStorage.getItem(TOKEN_LOCALSTROGE_NAME);
    const token = JSON.parse(local);
    if (token && token.token) {
      return token.token;
    }
  } catch (error) {
    return false;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_LOCALSTROGE_NAME);
};
