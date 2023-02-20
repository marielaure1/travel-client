

const options = {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <a href="api/locations/{{ locations.slug }}" class="card" v-for="location in locations" :key="location.updated_at">
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </a>
            
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