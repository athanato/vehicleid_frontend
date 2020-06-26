<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="model">Model</label>
                <input
                        type="text"
                        class="form-control"
                        id="model"
                        required
                        v-model="vehicle.model"
                        name="model"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input
                        class="form-control"
                        id="description"
                        required
                        v-model="vehicle.description"
                        name="description"
                />
            </div>

            <button @click="saveVehicle" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newVehicle">Add</button>
        </div>
    </div>
</template>

<script>
    //import VehicleDataService from "../services/VehicleDataService";
    import VehicleDataService from "../services/VehicleDataService";

    export default {
        name: "add-vehicle",
        data() {
            return {
                vehicle: {
                    id: null,
                    model: "",
                    description: "",
                    registered: false
                },
                submitted: false
            };
        },
        methods: {
            saveVehicle() {
                var data = {
                    model: this.vehicle.model,
                    description: this.vehicle.description
                };

                VehicleDataService.create(data)
                    .then(response => {
                        this.vehicle.id = response.data.id;
                        console.log(response.data);
                        this.submitted = true;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            newVehicle() {
                this.submitted = false;
                this.vehicle = {};
            }
        }


};
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>