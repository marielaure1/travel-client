export default {
    props: ["API_URL"],
    data(){
        return {
        };
    },
    template: `
        <div class="location">
           
        </div>
    `,
    mounted(){
        console.log(this.$route.query.location);
        fetch(`${this.API_URL}/locations/${this.$route.query.location}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            })
    }
}