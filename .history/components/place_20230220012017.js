export default {
    props: ["API_URL"],
    data(){
        return {
            place: [],
            responseAdd: "",
            locations: []

        }
    },
    template: `
        <div class="grid-container">
            <div class="place">
                <h2>{{place.name}}</h2>
                <p>Creer le : {{place.created_at}}</p>
                <p>Modifier le: {{place.updated_at}}</p>
                <p>Latitude : {{place.lat}}</p>
                <p>Longitude : {{place.lng}}</p>
            </div>
        </div>
    `, 
    method
    mounted(){
        
        fetch(`${this.API_URL}/places/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            json.created_at = this.dateFormat(json.created_at)
            json.updated_at = this.dateFormat(json.updated_at)
           this.place = json
           console.log(json);
        })

    }
}