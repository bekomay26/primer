// A mock function to mimic making an async request for data
import axios from "axios";

export async function loginUser(credentials) {
  const response = await axios({
    method: "post",
        url: `${process.env.REACT_APP_API_URL}auth/login`,
      data: credentials,
      headers: {'Content-Type': 'multipart/form-data',}
}
  );
  return response;
}

// export default loginUser;
