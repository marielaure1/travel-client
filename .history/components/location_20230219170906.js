export default {
    props: ["API_URL"],
    data(){
        return {
            location: "",
            
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
        <div class="places" v-if="places.length">
            
            <div v-for="place in places" :key="place.updated_at">
                <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"  v-bind:checked="place.visited === 1" v-model="isvisited" @click.prevent="visited"/>
                <label for="place-input">{{ place.name }}</label>
            </div>
        
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
        delete(){
           console.log("test")
        }
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