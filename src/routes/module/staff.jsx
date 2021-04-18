import loadable from "../../utils/loadable";

const Staff = [
  {
    path: "/restaurant/staff/:identity",
    name: "staff",
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: 'gourmet' */ "../../templates/restaurant/staff"),
    }),
  },
];

export default Staff;
