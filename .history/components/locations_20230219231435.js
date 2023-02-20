export default {
    props: ["API_URL"],
    data(){
        return {
            locations: [],
            name: "",
            lat: "",
            lng: "",
            showname: "",
            showlat: "",
            showlng: "",
            responseAdd: "",
            responseDelete: "",
            responseUpdate: "",
            show: ""
        }
    },
    template: `
    <div v-if="responseAdd.message" class="message">{{ responseAdd.message }}</div>
    <div v-if="responseDelete.message" class="message">{{ responseDelete.message }}</div>
    <div class="locations" v-if="locations.length">
        <div class="card" v-for="location in locations" :key="location.updated_at">
            <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}">
                <div>
                    <h3>{{ location.name }}</h3>
                    <p>{{ location.place.length }} lieu à visiter</p>
                </div>
                
            </router-link>
            <div>
                <button type="button" @click="showLocation(location.id)"><iconify-icon icon="system-uicons:pen"></iconify-icon></button>
                <button type="button" @click="deleteLocation(location.id)"><iconify-icon icon="iconoir:bin-full"></iconify-icon></button>
            </div>
        </div>
    </div>
    <form @submit.prevent="create" class="createLocation">
        <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="name">
        <div v-if="responseAdd.name">
            <p v-for="response in responseAdd.name">{{response}}</p>
        </div>
        <input type="text" name="lat" placeholder="Latitude" v-model="lat">
        <div v-if="responseAdd.lat">
            <p v-for="response in responseAdd.lat">{{response}}</p>
        </div>
        <input type="text" name="lng" placeholder="Longitude" v-model="lng">
        <div v-if="responseAdd.lng">
            <p v-for="response in responseAdd.lng">{{response}}</p>
        </div>
        <button type="submit">Ajouter</button>
    </form>
    <form @submit.prevent="updateLocation(show.id)" v-if="show">
        <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="showname">
        <div v-if="responseUpdate.name">
            <p v-for="response in responseUpdate.name">{{response}}</p>
        </div>
        <input type="text" name="lat" placeholder="Latitude" v-model="showlat">
        <div v-if="responseUpdate.lat">
            <p v-for="response in responseUpdate.lat">{{response}}</p>
        </div>
        <input type="text" name="lng" placeholder="Longitude" v-model="showlng">
        <div v-if="responseUpdate.lng">
            <p v-for="response in responseUpdate.lng">{{response}}</p>
        </div>
        <button type="submit">Update</button>
    </form>
    
    `, 
    methods: {
        get(){
            fetch(`${this.API_URL}/locations`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.locations = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        showLocation(idLocation){
            console.log(idLocation);
            fetch(`${this.API_URL}/locations/${idLocation}`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.show = data
                    this.showname = data.name
                    this.showlat = data.lat
                    this.showlng = data.lat
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        initForm(){
            this.name = ""
            this.lat = ""
            this.lng = ""
        },
        create(){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": parseFloat(this.lat),
                "lng": parseFloat(this.lng),
                
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations`, { 
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.initForm()
                    this.responseAdd = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        updateLocation(idDelete){
            let data = {
                "name": this.showname,
                "slug": this.showname,
                "lat": parseFloat(this.showlat),
                "lng": parseFloat(this.showlng),
                
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${idDelete}`, { 
                method: "PUT",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.responseUpdate = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        deleteLocation(idDelete){
            console.log(idDelete);
            fetch(`${this.API_URL}/locations/${idDelete}`, { method: "DELETE" })
            let id = {
                "id": idDelete 
            }
            console.log(id.id);
            
            fetch(`${this.API_URL}/locations`, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(id.id) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.responseDelete = data
                    this.get()
                    
                    console.log(responseDelete);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        }
    },
    mounted(){
        this.get()

    }
}