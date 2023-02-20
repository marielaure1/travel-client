export default {
    props: ["API_URL"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
            <router-link :to="{ name: 'places', params: { sluglocation : location.slug }, query: {id : location.id}}" class="card" v-for="location in locations" :key="location.updated_at">
        </div>
    `,
    mounted(){
        console.log(`${this.API_URL}/locations/${this.$route.query.id}`);
        fetch(`${this.API_URL}/locations/${this.$route.query.id}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.location = json
            })
    }
}