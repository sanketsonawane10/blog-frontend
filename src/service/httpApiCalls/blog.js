import baseUrl from "../../utils/constants/baseUrl";
import axios from 'axios';

export const getBlogList = async ({
  search = '',
  filters = '',
  attributes = '',
  sort = '',
  page = '',
  limit = ''
}) => {
  try {

    let config = {
      method: 'get',
      url: `${baseUrl}/blog?page=${page}&limit=${limit}&filters=${filters}&attributes=${attributes}&sort=${sort}&search=${search}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config)
    console.log(result);
    return result;

  } catch (err) {
    throw err;
  }
};

export const createBlog = async (data) => {
  try {

    let config = {
      method: 'post',
      url: `${baseUrl}/blog`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config)
    console.log(result);
    return result;

  } catch (err) {
    throw err;
  }
};