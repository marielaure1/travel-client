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
        fetch(`${this.API_URL}/locations/1`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            // console.log(json);
            })
    }
}