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
            <p>{{place.created_at}}</p>
            <p>{{place.updated_at}}</p>
            <p>{{place.lat}}</p>
            <p>{{place.lng}}</p>
        </div>
    `, 
    method
    mounted(){
        
        fetch(`${this.API_URL}/places/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.place = json
           console.log(json);
        })

    }
}