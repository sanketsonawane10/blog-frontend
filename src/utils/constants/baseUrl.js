import { blogBackendUrls } from '../../utils/constants/urls.constants';

console.log(blogBackendUrls);

console.log(process.env);

const baseUrl = blogBackendUrls[process.env.REACT_APP_BUILD_ENV];

console.log(baseUrl);

export default baseUrl;