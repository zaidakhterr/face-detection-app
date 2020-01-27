//setup config/headers
export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //if token add header
  if (token) config.headers['Auth-Token'] = token;

  return config;
};
