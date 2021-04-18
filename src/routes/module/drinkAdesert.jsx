import loadable from "../../utils/loadable";

const DrinkAdesert = [
  {
    path: "/restaurant/drinkAdesert",
    name: "drinkAdesert",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'gourmet' */ "../../templates/restaurant/drinkAdesert"),
    }),
    childRoutes: [
      {
        path: "/restaurant/drinkAdesert/dish/:type&:id",
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

export default DrinkAdesert;
