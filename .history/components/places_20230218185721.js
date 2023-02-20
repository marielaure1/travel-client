export default {
    props: ["API_URL"],
    data(){
        return {
            places: []

        }
    },
    template: `<div class="places" v-if="places.length">
        <router-link :to="{ name: 'places'}" class="card" v-for="places in places" :key="places.updated_at">
            <div @click="$emit('getId', {'id': places.id})">
                <h3>{{ places.name }}</h3>
                <p>{{ places.length }} lieu à visiter</p>
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