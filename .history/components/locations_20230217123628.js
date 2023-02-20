export default {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <router-link :to="{ name: 'location', params: { sluglocation : location.slug } }"  class="card" v-for="location in locations" :key="location.updated_at" @click.prevent="$emit('id', ), {'">
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </router-link>
            
        </div>
    `,
    methods:{
        show(){
            fetch(`http://localhost:8000/api/locations/${}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            this.locations = json
            })
        }
    },
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           this.locations = json
        })

    }
}