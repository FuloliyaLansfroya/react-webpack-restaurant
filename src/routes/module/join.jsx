import loadable from "../../utils/loadable";

const Join = [
  {
    path: "/restaurant/join",
    name: "join",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'join' */ "../../templates/restaurant/store"),
    }),
    childRoutes: [
      {
        path: "/restaurant/join/joinForm",
        name: "joinForm",
        component: loadable({
          loader: () =>
            import(
              /* webpackChunkName: 'joinForm' */ "../../components/joinForm"
            ),
        }),
      },
    ],
  },
];

export default Join;
