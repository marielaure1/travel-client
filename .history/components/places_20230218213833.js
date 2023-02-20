export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: ""

        }
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
        </div>
        <div class="places" v-if="places.length">
            
                <div>
                    <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"/>
                    <router-link :to="{ name: 'places', params: { sluglocation : place.slug, id : place.id }} class="card" v-for="place in places" :key="place.updated_at">
                    <label for="place-input">{{ place.name }}</label>

                </div>
            
        </div>
    `, 
    mounted(){
        console.log(`${this.API_URL}/locations/${this.$route.params.id}/places`);
        fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}