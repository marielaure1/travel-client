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
        console.log(this.locationId);
        fetch(`${this.API_URL}/locations/${$routerd}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            // console.log(json);
            })
    }
}