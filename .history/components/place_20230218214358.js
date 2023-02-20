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
        </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/places/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.places = json
           console.log(json);
        })

    }
}