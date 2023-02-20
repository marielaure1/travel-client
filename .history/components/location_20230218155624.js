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
        log
        fetch(`${this.API_URL}/locations/${this.$route}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            })
    }
}