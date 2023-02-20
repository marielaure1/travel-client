export default {
    props: ["API_URL"],
    data(){
        return {
            places: []

        }
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
        </div>
    `, 
    mounted(){
        fetch(`${this.API_URL}/places/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}