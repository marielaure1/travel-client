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
            checked: ""
            
        };
    },
    template: `
        <div v-if="responseAdd.message" class="message">{{ responseAdd.message }}</div>
        <div v-if="responseUpdate.message" class="message">{{ responseUpdate.message }}</div>
        <div v-if="responseDelete.message" class="message">{{ responseDelete.message }}</div>
        <div class="location">
            <h2>{{location.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
        </div>
        <div class="places" v-if="places.length">
            <div v-for="place in places" :key="place.updated_at">
                    <input type="checkbox" v-model="showvisited"   />
                    <router-link :to="{ name: 'place', params: { slugplace : place.slug, id : place.id }}">{{ place.name }}</router-link>
                
                <div>
                    <button type="button" @click="deletePlace(place.id)">Supprimer</button>
                    <button type="button" @click="showPlace(place.id)">Update</button>
                </div>
            </div>
        </div>
     
        <form @submit.prevent="create">
            <input type="text" name="name" placeholder="Place" v-model="name">
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

        <form @submit.prevent="updatePlace(show.id)" v-if="show">
            <input type="text" name="name" placeholder="Place" v-model="showname">
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
            <input type="checkbox" v-model="showvisited" :checked="parseInt(showvisited) === 1"  />
            <label>Visited</label>
            <button type="submit">Update</button>
        </form>
    `,
    methods: {
        get(){
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`)
            .then(response => response.json())
            .then(json => {
                this.location = json.location
                this.places = json.place
              
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
            console.log(idDelete);
            fetch(`${this.API_URL}/places/${idDelete}`, { method: "DELETE" })
            let id = {
                "id": idDelete 
            }
            console.log(id);
            
            fetch(`${this.API_URL}/locations`, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(id) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.responseDelete = data
                    this.get()
                    
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        updateVisited(a){
            let datas = {
                "visited": a.visited,
                "lat": parseFloat(a.lat),
                "lng": parseFloat(a.lng),
                "name": a.name,
                "location_id": parseInt(this.$route.params.id)
            }

            console.log(datas);
            
            // fetch(`${this.API_URL}/places/${idUpdate}`, { 
            //     method: "PUT",
            //     headers: {
            //     'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(datas) 
            // })
            // .then((response) => {
            //     response
            //       .json()
            //       .then((data) => {
            //         console.log(data);
            //         this.get()
            //         this.responseUpdate = data
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //       });
            // })
            // .catch((e) => {
            //     console.log(e);
            // });
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