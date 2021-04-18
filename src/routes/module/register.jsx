import loadable from "../../utils/loadable";

const register = [
  {
    path: "/restaurant/register",
    name: "register",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'register' */ "../../components/Register"),
    }),
  },
];

export default register;
