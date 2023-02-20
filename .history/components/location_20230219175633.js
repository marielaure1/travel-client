export default {
    props: ["API_URL"],
    data(){
        return {
            location: "",
            places: [],
            location: "",
            responseAdd: "",
            locations: [],
            responseVisited: "",
            idVisited: "",
            isvisited: ""
            
        };
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
        </div>
        <div class="places" v-if="places.length">
            
            <div v-for="place in places" :key="place.updated_at">
                <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input" v-bind:checked="place.visited === 1" v-model="isvisited" @click.prevent="updatePlace({'name': place.name, 'lat': place.lat, 'lng': place.lng, 'location_id': place.location_id })"/>
                <label for="place-input">{{ place.name }}</label>
            </div>
        
        </div>
     
        
    `,
    methods: {
        get(){
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                this.location = json.location
                this.places = json.place
                console.log(json);
            })
        },
        // create(){
        //     let data = {
        //         "name": this.name,
        //         "slug": this.name,
        //         "lat": parseFloat(this.lat),
        //         "lng": parseFloat(this.lng),
        //         "visited": 0,
        //         "location_id": this.$route.params.id
        //     }
        //     console.log(data);
            
        //     fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { 
        //         method: "POST",
        //         headers: {
        //         'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data) 
        //     })
        //     .then((response) => {
        //         response
        //           .json()
        //           .then((data) => {
        //             console.log(data);
        //             this.get()
        //             this.initForm()
        //             this.responseAdd = data
        //           })
        //           .catch((e) => {
        //             console.log(e);
        //           });
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        // },
        updatePlace(){
            let data = {
                "visited": this.isvisited,
                "lat": this.lat,
                "lng": this.lng,
                "name": this.name,
                "location_id": this.$route.params.id
                
            }
            console.log(data);
            
            fetch(`${this.API_URL}/places/${this.$route.params.id}`, { 
                method: "PUT",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.responseVisited = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        }
    },
    mounted(){

        
    }
}