export default {
    props: ["API_URL"],
    data(){
        return {
            places: []

        }
    },
    template: `<div class="places" v-if="places.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug }, query: {id : location.id}}" class="card" v-for="places in places" :key="location.updated_at">
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