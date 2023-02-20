export default {
    props: ["API_URL"],
    data(){
        return {
            location: "",
            responseAdd: "",
            locations: []
        };
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
            <router-link :to="{ name: 'places'}" class="card">Places</router-link>
        </div>
        <router-view></router-view>
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
            <select name="location_id" v-model="location_id">
                <option value="">{{}}</option>
            </select>
            <div v-if="responseAdd.location_id">
                <p v-for="response in responseAdd.location_id">{{response}}</p>
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
    },
    mounted(){
        fetch(`${this.API_URL}/locations/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.location = json
        })
    }
}