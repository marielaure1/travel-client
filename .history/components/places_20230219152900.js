export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: ""

        }
    },
    template: `
        <div class="places" v-if="places.length">
            
               
            
        </div>
    `, 
    mounted(){
        console.log(`${this.API_URL}/locations/${this.$route.params.id}/places`);
        fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}