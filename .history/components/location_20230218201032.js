export default {
    props: ["API_URL"],
    data(){
        return {
        };
    },
    template: `
        <div class="location">
            <h2>{{ location }}</h2>
           
        </div>
    `,
    mounted(){
        console.log(this.locationId);
        fetch(`${this.API_URL}/locations/${this.locationId}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.location = json
        })
    }
}