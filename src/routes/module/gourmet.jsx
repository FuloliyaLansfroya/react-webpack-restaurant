import loadable from "../../utils/loadable";

const gourmet = [
  {
    path: "/restaurant/gourmet",
    name: "gourmet",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'gourmet' */ "../../templates/restaurant/gourmet"),
    }),
    childRoutes: [
      {
        path: "/restaurant/gourmet/dish/:type&:id",
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

export default gourmet;
