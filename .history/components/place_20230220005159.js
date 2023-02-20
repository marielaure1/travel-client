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
        <div class="place">
            <h2>{{place.name}}</h2>
            <p>Creer le :{{place.created_at}}</p>
            <p>Modifier le: {{place.updated_at}}</p>
            <p>Latitude : {{place.lat}}</p>
            <p>{{place.lng}}</p>
        </div>
    `, 
    dateFormat(timestamp){
        const date = new Date(timestamp);

        const year = date.getFullYear().toString().substr(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

        return formattedDate 
    },
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