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
            <router-link :to="{ name: 'places'}" class="card" v-for="places in places" :key="place.updated_at">
                <div @click="$emit('getId', {'id': place.id})">
                    <h3>{{ place.name }}</h3>
                </div>
            </router-link>
        </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/locations/1/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.placees = json
           console.log(json);
        })

    }
}