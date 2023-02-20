export default {
    props: ["API_URL"],
    data(){
        return {
            locations: []

        }
    },
    template: `<div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug }}" class="card" v-for="location in locations" :key="location.updated_at">
            <div @click="$emit('getId', {'id': location.id})">
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </div>
        </router-link>
    </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.locations = json
        })

    }
}