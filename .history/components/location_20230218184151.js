export default {
    props: ["API_URL"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
        h
           <p></p>
        </div>
    `,
    mounted(){
        console.log(`${this.API_URL}/locations/${this.$route.query.id}`);
        fetch(`${this.API_URL}/locations/${this.$route.query.id}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.location = json
            })
    }
}