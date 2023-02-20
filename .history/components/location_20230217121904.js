export default {
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

        fetch(`http://localhost:8000/api/locations/${$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           this.locations = json
        })

    }
}