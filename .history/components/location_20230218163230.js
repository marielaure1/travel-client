export default {
    props: ["API_URL", "locationId"],
    data(){
        return {
        };
    },
    template: `
        <div class="location">
           
        </div>
    `,
    mounted(){
        console.log(this.locat);
        fetch(`${this.API_URL}/locations/${this.locationId}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            // console.log(json);
            })
    }
}