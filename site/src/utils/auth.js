import auth0js from 'auth0-js';

export const isBrowser = typeof window !== 'undefined';

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
let profile = false;

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false
};

// Only instantiate Auth0 if we’re in the browser.
const auth0 = isBrowser
  ? new auth0js.WebAuth({
      domain: "dev-en4d7gc6egik0rbq.us.auth0.com",
      clientID: "2Yd7XIiEYjsMGSZu5J5JP7E1GsawQSTi",
      redirectUri: "http://localhost:8888/account/callback",
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  : {};

  export const login = () => {
    if (!isBrowser) {
      return;
    }
  
    auth0.authorize();
};

export const logout = () => {
    localStorage.setItem('isLoggedIn', false);
    profile = false;

    auth0.logout({ returnTo: "http://localhost:8888" });
};

const setSession = callback => (err, authResult) => {
    if (!isBrowser) {
        return;
    }

    // if (localStorage.getItem("isLoggedIn") === "true" && err.error === 'login_required') {
    //     console.error(err);
    //     callback()
    //     return
    // }

    console.log(authResult)
    if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        tokens.accessToken = authResult.accessToken;
        tokens.idToken = authResult.idToken;
        tokens.expiresAt = expiresAt;
        
        auth0.client.userInfo(tokens.accessToken, (_err, userProfile) => {
            profile = userProfile
            localStorage.setItem("isLoggedIn", true)
            callback()
        })
    }

    callback()
};

export const checkSession = callback => {
    if (!isBrowser) {
        return;
    }

    if (localStorage.getItem("isLoggedIn") === "false") {
        callback();
        
    }

    auth0.checkSession({}, setSession(callback));
};

export const handleAuthentication = (callback = () => {}) => {
    if (!isBrowser) {
        return;
    }

    auth0.parseHash(setSession(callback));
};

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }

    console.log(localStorage)
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const getAccessToken = () => {
    if (!isBrowser) {
        return '';
    }

    return tokens.accessToken;
};

export const getUserInfo = () => {
    if (profile) {
        return profile;
    }
};