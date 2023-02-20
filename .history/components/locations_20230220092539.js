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
    <button class="add btn center" @click.prevent="add('.createLocation')">Ajouter</iconify-icon></button>
    <div class="locations" v-if="locations.length">
        <div class="card" v-for="location in locations" :key="location.updated_at">
            <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}">
                <div>
                    <h3>{{ location.name }}</h3>
                    <p>{{ location.place.length }} lieux</p>
                </div>
                
            </router-link>
            <div>
                <button type="button" @click="showLocation(location.id)"><iconify-icon icon="system-uicons:pen"></iconify-icon></button>
                <button type="button" @click="deleteLocation(location.id)"><iconify-icon icon="iconoir:bin-full"></iconify-icon></button>
            </div>
        </div>
    </div>
    <form @submit.prevent="create" class="form createLocation">
        <span class="close" @click.prevent="close('.createLocation')"><iconify-icon icon="basil:cross-outline"></iconify-icon></span>

        <h2>Ajouter un lieu/ville</h2>
        <div class="content">
            <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="name">
            <div v-if="responseAdd.name" class="error">
                <p v-for="response in responseAdd.name">{{response}}</p>
            </div>
            <input type="text" name="lat" placeholder="Latitude" v-model="lat">
            <div v-if="responseAdd.lat" class="error">
                <p v-for="response in responseAdd.lat">{{response}}</p>
            </div>
            <input type="text" name="lng" placeholder="Longitude" v-model="lng">
            <div v-if="responseAdd.lng" class="error">
                <p v-for="response in responseAdd.lng">{{response}}</p>
            </div>
        </div>
        <button type="submit" class="btn">Ajouter</button>
    </form>
    <form @submit.prevent="updateLocation(show.id)" class="form showLocation">
        <span class="close" @click.prevent="close('.showLocation')"><iconify-icon icon="basil:cross-outline"></iconify-icon></span>

        <h2>Modifier un lieu/ville</h2>

        <div class="content">
            <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="showname">
            <div v-if="responseUpdate.name" class="error"> 
                <p v-for="response in responseUpdate.name">{{response}}</p>
            </div>
            <input type="text" name="lat" placeholder="Latitude" v-model="showlat">
            <div v-if="responseUpdate.lat" class="error">
                <p v-for="response in responseUpdate.lat">{{response}}</p>
            </div>
            <input type="text" name="lng" placeholder="Longitude" v-model="showlng">
            <div v-if="responseUpdate.lng" class="error">
                <p v-for="response in responseUpdate.lng">{{response}}</p>
            </div>
        </div>
        <button type="submit" class="btn">Update</button>
    </form>
    
    `, 
    methods: {
        message(){
            this.add(".message")
            setTimeout(() => {
                this.close(".message")
            }, 3000);
            
        },
        add(element){
            document.querySelector(`${element}`).classList.add("active")
        },
        close(element){
            document.querySelector(`${element}`).classList.remove("active")
        }, 
        get(){
            fetch(`${this.API_URL}/locations`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
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

                    this.add(".showLocation")
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

                    this.close(".createLocation")
                    // this.message()
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
                    this.get()
                    this.responseUpdate = data

                    this.close(".showLocation")
                    // this.message()
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
            let datas = {
                "id": idDelete 
            }
            
            fetch(`${this.API_URL}/locations/${idDelete}`, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                } ,
                body: JSON.stringify(datas.id) 
            })
            .then((response) => {
                response.json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.responseDelete = data
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