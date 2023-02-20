export default {
    props: ["API_URL"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
            <h2>location.name</h2>
            <p>location.created_at</p>
            <p>location.updated_at</p>
            <p>location.lat</p>

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