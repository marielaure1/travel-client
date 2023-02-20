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
            <router-link :to="{ name: 'places'}" class="card" v-for="place in places" :key="place.updated_at">
                <div @click="$emit('getId', {'id': place.id})">
                    <input type="checkbox" name="visited" value="{{ place.id }}"/>{{ place.name }}

                </div>
            </router-link>
        </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/locations/1/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}