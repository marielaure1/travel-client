

const options = {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <div class="card" v-for="locatio">
                <h3></h3>
            </div>
            
        </div>
    `,
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           this.locations = json

        })

    }
}

Vue.createApp(options).mount("#app")