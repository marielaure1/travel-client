export default {
    props: ["API_URL"],
    data(){
        return {
            locations: []

        }
    },
    template: `<div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}" class="card" v-for="location in locations" :key="location.updated_at">
            <div>
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </div>
        </router-link>
    </div>
    <form @submit.prevent="create">
        <input type="text" name="name" placeholder="Nom du lieu/ville">
        <input type="text" name="lat" placeholder="Latitude">
        <input type="text" name="lng" placeholder="Longitude">
        <button type="submit">Ajouter</button>
    </form>
    `, 
    method: {
        create(){
            let data = {
                
            }
            fetch(`${this.API_URL}/locations`, { 
                method: "POST",
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
        }
    },
    mounted(){
        fetch(`${this.API_URL}/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.locations = json
        })

    }
}