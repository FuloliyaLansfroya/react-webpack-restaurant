import loadable from "../../utils/loadable";

const login = [
  {
    path: "/restaurant/login",
    name: "login",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'login' */ "../../components/Login"),
    }),
  },
];

export default login;
