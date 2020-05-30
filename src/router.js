import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/vehicles",
            name: "vehicles",
            component: () => import("./components/VehiclesList")
        },
        {
            path: "/vehicles/:id",
            name: "vehicle-details",
            component: () => import("./components/Vehicle")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddVehicle")
        }
    ]
});
