export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: ""

        }
    },
    template: `
        <div class="places" v-if="places.length">
            
                <div v-for="place in places" :key="place.updated_at">
                    <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"/>
                    <label for="place-input">
                        <router-link :to="{ name: 'place', params: { slugplace: place.slug, id : place.id }}">{{ place.name }}</router-link>
                    </label>
                    

                </div>
            
        </div>
    `, 
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