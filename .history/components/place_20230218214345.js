export default {
    props: ["API_URL"],slugplace
    data(){
        return {
            place: []

        }
    },
    template: `
        <div class="location">
            <h2>{{plate.name}}</h2>
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