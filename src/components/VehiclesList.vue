<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                       v-model="title"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchTitle"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Vehicles List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(vehicle, index) in vehicles"
                    :key="index"
                    @click="setActiveVehicle(vehicle, index)"
                >
                    {{ vehicle.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllVehicles">
                Remove All
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentVehicle">
                <h4>Vehicle</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ currentVehicle.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currentVehicle.description }} //not descrition
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentVehicle.published ? "Published" : "Pending" }} //not published
                </div>

                <a class="badge badge-warning"
                   :href="'/vehicles/' + currentVehicle.id"
                >
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Vehicle...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import VehicleDataService from "../services/VehicleDataService";

    export default {
        name: "vehicles-list",
        data() {
            return {
                vehicles: [],
                currentVehicle: null,
                currentIndex: -1,
                title: "" //not title propably model
            };
        },
        methods: {
            retrieveVehicles() {
                VehicleDataService.getAll()
                    .then(response => {
                        this.vehicles = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            refreshList() {
                this.retrieveVehicles();
                this.currentVehicle = null;
                this.currentIndex = -1;
            },

            setActiveVehicle(vehicle, index) {
                this.currentVehicle = vehicle;
                this.currentIndex = index;
            },

            removeAllVehicles() {
                VehicleDataService.deleteAll()
                    .then(response => {
                        console.log(response.data);
                        this.refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
               //searchModel         findbyModel
            searchTitle() {
                VehicleDataService.findByTitle(this.title)
                    .then(response => {
                        this.vehicles = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.retrieveVehicles();
        }
    };
</script>

<style scoped>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>