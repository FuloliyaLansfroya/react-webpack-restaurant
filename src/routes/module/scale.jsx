import loadable from "../../utils/loadable";

const Scale = [
  {
    path: "/restaurant/scale/:count&:type",
    name: "scale",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'gourmet' */ "../../templates/restaurant/scale"),
    }),
    childRoutes: [
      {
        path: "/restaurant/drinkAdesert/dish",
        name: "dish",
        component: loadable({
          loader: () =>
            import(
              /* webpackChunkName: 'dish' */ "../../templates/restaurant/dish"
            ),
        }),
      },
    ],
  },
];

export default Scale;
