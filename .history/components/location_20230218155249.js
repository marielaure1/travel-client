export default {
    props: ["API_URL"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
           
        </div>
    `,
    mounted(){
        fetch(`${this.API_URL}/locations/${this.$route.params.sluglocation}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            this.locations = json
            })
    }
}