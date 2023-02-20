export default {
    props: ["API_URL"],
    data(){
        return {
            place: []

        }
    },
    template: `
        <div class="place">
            <h2>{{place.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
        </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/places/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.place = json
           console.log(json);
        })

    }
}