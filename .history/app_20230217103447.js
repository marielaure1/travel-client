

const options = {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <div class="card" v-for="location in locations" :key="locations.id">
                <h3>{{ locations.name }}</h3>
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