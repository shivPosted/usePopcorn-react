const API_BASE = import.meta.env.VITE_BACKEND_ENDPOINT;

async function createUser(formData) {
  try {
    const res = await fetch(`${API_BASE}/users/register`, {
      method: "post",
      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function getUser() {
  try {
    const res = await fetch(`${API_BASE}/users/getProfile`, {
      method: "get",
      credentials: "include",
    });

    const recievedData = await res.json();
    if (!res.ok)
      throw new Error(recievedData.error || "Can not fetch user info");

    const {
      _id: userId,
      fullName,
      userName,
      email,
      avatar,
    } = recievedData.data;

    return {
      fullName,
      userName,
      email,
      avatar,
      userId,
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function loginUser(formData) {
  try {
    const res = await fetch(`${API_BASE}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
async function logOutUser(dispatch) {
  try {
    const res = await fetch(`${API_BASE}/users/logout`, {
      method: "post",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
    dispatch({ type: "RESET/LOGOUT" });
    return data.message;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export { createUser, getUser, loginUser, logOutUser };
