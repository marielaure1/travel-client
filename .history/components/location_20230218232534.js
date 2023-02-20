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
            <router-link :to="{ name: 'places'}" class="card">Places</router-link>
            <form @submit.prevent="delete">
                <input type="hidden" name="id" value="location.id"/>
                <button type="button">Supprimer</button>
            </form>
        </div>
        <router-view></router-view>
    `,
    methods: {
        delete(){
            fetch(`${this.API_URL}/locations/${this.$route.params.id}`, { 
                method: "DELETE",
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
        fetch(`${this.API_URL}/locations/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.location = json
        })
    }
}