export default {
    props: ["API_URL", "locationId"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
            <h2>{{location.name}} </h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
            <router-link :to="{ name: 'places'}" class="card">Places</router-link>
        </div>
    `,
    mounted(){
        console.log(this.locationId);
        // fetch(`${this.API_URL}/locations/${this.locationId}`, { method: "GET" })
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //         this.location = json
        //     })
    }
}