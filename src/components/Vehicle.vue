<template>
    <div v-if="currentVehicle" class="edit-form">
        <h4>Vehicle</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title"
                       v-model="currentVehicle.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>  //not description
                <input type="text" class="form-control" id="description"
                       v-model="currentVehicle.description"
                />
            </div>

            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentVehicle.published ? "Published" : "Pending" }}
            </div>
        </form>

        <button class="badge badge-primary mr-2"
                v-if="currentVehicle.published"
                @click="updatePublished(false)"
        >
            UnPublish
        </button>
        <button v-else class="badge badge-primary mr-2"
                @click="updatePublished(true)"
        >
            Publish
        </button>

        <button class="badge badge-danger mr-2"
                @click="deleteVehicle"
        >
            Delete
        </button>

        <button type="submit" class="badge badge-success"
                @click="updateVehicle"
        >
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Vehicle...</p>
    </div>
</template>

<script>
    import VehicleDataService from "../services/VehicleDataService";

    export default {
        name: "vehicle",
        data() {
            return {
                currentVehicle: null,
                message: ''
            };
        },
        methods: {
            getVehicle(id) {
                VehicleDataService.get(id)
                    .then(response => {
                        this.currentVehicle = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            updatePublished(status) {
                var data = {
                    id: this.currentVehicle.id,
                    title: this.currentVehicle.title,
                    description: this.currentVehicle.description,  //not description
                    published: status
                };

                VehicleDataService.update(this.currentVehicle.id, data)
                    .then(response => {
                        this.currentVehicle.published = status;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            updateTutorial() {
                VehicleDataService.update(this.currentVehicle.id, this.currentVehicle)
                    .then(response => {
                        console.log(response.data);
                        this.message = 'The vehicle was updated successfully!';
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            deleteVehicle() {
                VehicleDataService.delete(this.currentVehicle.id)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: "vehicles" });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.message = '';
            this.getVehicle(this.$route.params.id);
        }
    };
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>