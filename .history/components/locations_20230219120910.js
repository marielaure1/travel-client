export default {
    props: ["API_URL"],
    data(){
        return {
            locations: [],
            name: "",
            lat: "",
            lng: "",
            responseAdd: ""

        }
    },
    template: `
    <div v-if="responseAdd.message" class="message">{{ responseAdd.message }}</div>
    <div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}" class="card" v-for="location in locations" :key="location.updated_at">
            <div>
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </div>
            <div>
                <div @click.prevent="delete">Supprimer</div>
                <div @click.prevent="update">Update</div>
            </div>
        </router-link>
    </div>
    <form @submit.prevent="create">
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
        }
    },
    delete(){
        fetch(`${this.API_URL}/locations/${this.API_URL}`, { method: "DELETE" })
        let id = {
            "id": this.id
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
                this.get()
                this.responseDelete = data
                console.log(responseDelete);
              })
              .catch((e) => {
                console.log(e);
              });
        })
        .catch((e) => {
            console.log(e);
        });
    },
    mounted(){
        this.get()

    }
}