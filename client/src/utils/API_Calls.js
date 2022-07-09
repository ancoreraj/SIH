// Login credential:- mail@google.com, test@123

const API_BASE_URL = "http://localhost:5000"


export const request_api_call = async (endPoint, requestMethod, data=null) => {
    const url = `${API_BASE_URL}${endPoint}`;
    const token = localStorage.getItem("token");
    const auth_token = token ? `Token ${token}` : "";
    data = data ? JSON.stringify(data) : data;
  
    const response = await fetch(url, {
        method: requestMethod,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth_token
        },
        body: data
    });

    if(response.ok) {
        const json = await response.json();
        return json;
    } else {
        const errorJson = await response.json();
        return {
            error: true,
            message: errorJson.error
        };
    }
}

export const getUserData = () => {
    return request_api_call("/auth/me", "GET");
}

export const registerUser = (authData) => {
    return request_api_call("/auth/register", "POST", authData);
}

export const loginUser = (authData) => {
    return request_api_call("/auth/login", "POST", authData);
}

export const buildUserProfile = userData => {
    return request_api_call("/auth/build-profile", "POST", userData);
}