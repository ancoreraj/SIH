
const API_BASE_URL = process.env.REACT_APP_API_URL

export const request_api_call = async (endPoint, requestMethod, data) => {
    const token = localStorage.getItem("token");
    const auth_token = token ? `Bearer ${token}` : "";

    const response = await fetch(endPoint, {
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
        console.log(errorJson);
        return {
            error: true,
            message: errorJson.error
        };
    }
}

export const getAuthToken = (email, password) => {
    return request_api_call("/login", "POST", {email, password});
}