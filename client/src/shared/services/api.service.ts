import axios, {isAxiosError} from "./axios";

export const getData = async (url: string, params = {}) => {
  try {
    const res = await axios.get(url, { params });
    return res.data;
  } catch (e) {
    return e;
  }
};

export const postData = async (
  url: string,
  body: object | undefined,
  params = {},
) => {
  try {
    const res = await axios.post(url, body, { params });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Something went wrong', { cause: error }
      );
    }

    throw error;
  }
};

export const patchData = async (url: string, data = {}, params = {}) => {
  try {
    const res = await axios.patch(url, data, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const putData = async (url: string, data = {}, params = {}) => {
  try {
    const res = await axios.put(url, data, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteData = async (url: string, params = {}) => {
  try {
    const res = await axios.delete(url, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};
