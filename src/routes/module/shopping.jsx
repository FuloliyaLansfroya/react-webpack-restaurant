import loadable from "../../utils/loadable";

const shopping = [
  {
    path: "/restaurant/shopping",
    name: "shopping",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'shopping' */ "../../templates/restaurant/shopping"),
    }),
    childRoutes: [
      {
        path: "/restaurant/shopping/dish/:type&:id",
        name: "dish",
        component: loadable({
          loader: () =>
            import(
              /* webpackChunkName: 'dish' */ "../../templates/restaurant/dish"
            ),
        }),
      },
    ]
  },
];

export default shopping;
