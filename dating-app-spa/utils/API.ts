import axios from "axios";

// try {
//   const token = window.localStorage.getItem("token");
//   if (token) {
//     // AXIOS GLOBALS
//     axios.defaults.headers.common["Authorization"] = token;
//   }
// } catch (err) {}

const axiosInstance = axios.create({
  baseURL: process.env.baseUrl,
  responseType: "json",
  // timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// INTERCEPTING REQUESTS & RESPONSES
axiosInstance.interceptors.request.use(
  (config) => {
    if (config) {
      if (config.method) {
        console.log(
          `${config.method.toUpperCase()} request sent to ${
            config.url
          } at ${new Date().getTime()}`
        );
      }
      if (config.headers) {
        const token = window.localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export * from "axios";
export default axiosInstance;

/*======================*/
/*====== EXAMPLES ======*/
/*======================*/

function handleErrors(err: any) {
  if (err.response) {
    console.log("Problem With Response ", err.response.status);
  } else if (err.request) {
    console.log("Problem With Request!");
  } else {
    console.log("Error", err.message);
  }
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, posts) => console.log(posts)))
    .catch((err) => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => console.log(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request canceled!");
  }
}

// USING PARAMS
//   let userData = await API("/", {
//     params: {
//       results: 1,
//       inc: "name,email,picture",
//     },
//   });
//   // Parse the results for ease of use.
//   userData = userData.data.results[0];
