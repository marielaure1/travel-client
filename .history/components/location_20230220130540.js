export default {
    props: ["API_URL"],
    data(){
        return {
            location: "",
            places: [],
            location: "",
            responseAdd: "",
            locations: [],
            responseVisited: "",
            responseDelete: "",
            responseUpdate: "",
            isvisited: "",
            name: "",
            lat: "",
            lng: "",
            showname: "",
            showlat: "",
            showlng: "",
            showvisited: "",
            show: "",
            checked: "",
            activeClass: "active"
            
        };
    },
    template: `
        <div v-if="responseAdd.message" class="message">{{ responseAdd.message }}</div>
        <div v-if="responseUpdate.message" class="message">{{ responseUpdate.message }}</div>
        <div v-if="responseDelete.message" class="message">{{ responseDelete.message }}</div>
        <button class="add btn center" @click.prevent="add('.createLocation')">Ajouter</iconify-icon></button>
        <div class="grid-container">
            <div class="location">
                <h2>{{location.name}}</h2>
                <p>Creer le : {{location.created_at}}</p>
                <p>Modifier le: {{location.updated_at}}</p>
                <p>Latitude : {{location.lat}}</p>
                <p>Longitude : {{location.lng}}</p>
            </div>
            <div class="places" v-if="places.length">
                <div v-for="place in places" :key="place.updated_at" class="list">
                    <span class="r" :class='[place.visited == 1 ? activeClass: ""]'></span>
                    <router-link :to="{ name: 'place', params: { slugplace : place.slug, id : place.id }}">{{ place.name }}</router-link>
                    <button type="button" @click="showPlace(place.id)"><iconify-icon icon="system-uicons:pen"></iconify-icon></button>
                    <button type="button" @click="deletePlace(place.id)" ><iconify-icon icon="iconoir:bin-full"></iconify-icon></button>
                
                 <div>
            </div>
        </div>
     
        <form @submit.prevent="create"  class="form createLocation">
            <span class="close" @click.prevent="close('.createLocation')"><iconify-icon icon="basil:cross-outline"></iconify-icon></span>

            <h2>Ajouter une place</h2>
            <div class="content">
                <input type="text" name="name" placeholder="Place" v-model="name">
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

        <form @submit.prevent="updatePlace(show.id)" class="form showLocation">
            <span class="close" @click.prevent="close('.showLocation')"><iconify-icon icon="basil:cross-outline"></iconify-icon></span>

            <h2>Modifier une place</h2>

            <div class="content">
                <input type="text" name="name" placeholder="Place" v-model="showname">
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
                <div class="visited-content">
                    <span class="q">Déjà visité ? </span>
                    <span class="r oui" @click="changeVisited">Oui</span>
                    <span class="r non" @click="changeVisited">Non</span>
                </div>
            </div>
            <button type="submit" class="btn">Update</button>
        </form>
    `,
    methods: {
        changeVisited(){
            if(this.showvisited == 1){
                this.showvisited = 0
                document.querySelector(".oui").classList.remove("active")
                document.querySelector(".non").classList.add("active")
            } else {
                this.showvisited = 1
                document.querySelector(".oui").classList.add("active")
                document.querySelector(".non").classList.remove("active")
            }
        },
        dateFormat(timestamp){
            const date = new Date(timestamp);

            const year = date.getFullYear().toString().substr(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hours = ('0' + date.getHours()).slice(-2);
            const minutes = ('0' + date.getMinutes()).slice(-2);

            const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

            return formattedDate 
        },
        add(element){
            document.querySelector(`${element}`).classList.add("active")
        },
        close(element){
            document.querySelector(`${element}`).classList.remove("active")
        }, 
        get(){
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`)
            .then(response => response.json())
            .then(json => {
                json.location.created_at = this.dateFormat(json.location.created_at)
                json.location.updated_at = this.dateFormat(json.location.updated_at)
                this.location = json.location
                this.places = json.place
                console.log(json);
             
              
            })
        },
        initForm(){
            this.name = ""
            this.lat = ""
            this.lng = ""
        },
        create(idCreate){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": parseFloat(this.lat),
                "lng": parseFloat(this.lng),
                "visited": 0,
                "location_id": parseInt(this.$route.params.id)
            }
            
            fetch(`${this.API_URL}/locations/${parseInt(this.$route.params.id)}/places`, { 
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
                    this.get()
                    this.initForm()
                    this.responseAdd = data

                    this.close(".createLocation")
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        showPlace(idPlace){
            fetch(`${this.API_URL}/places/${idPlace}`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    this.show = data
                    this.showname = data.name
                    this.showlat = data.lat
                    this.showlng = data.lng
                    this.showvisited = data.visited
                    this.showid = idPlace

                    console.log(data.visited);
                    this.add(".showLocation")
                    
                    if(this.showvisited == 0){
                        document.querySelector(".oui").classList.remove("active")
                        document.querySelector(".non").classList.add("active")
                    } else {
                        document.querySelector(".oui").classList.add("active")
                        document.querySelector(".non").classList.remove("active")
                    }

                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        deletePlace(idDelete){
            let id = {
                "id": idDelete 
            }
            
            fetch(`${this.API_URL}/places/${idDelete}`, { 
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id) 
            })
            .then((response) => {
                this.get()
                response
                  .json()
                  .then((data) => {
                    this.responseDelete = data
                    
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        updatePlace(idUpdate){
            let datas = {
                "visited": this.showvisited,
                "lat": parseFloat(this.showlat),
                "lng": parseFloat(this.showlng),
                "name": this.showname,
                "location_id": parseInt(this.$route.params.id)
            }

            console.log(idUpdate);
            
            fetch(`${this.API_URL}/places/${idUpdate}`, { 
                method: "PUT",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.responseUpdate = data

                    this.close(".showLocation")
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
        LOG

        this.get()
    }
}