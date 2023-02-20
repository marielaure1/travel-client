export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: "",
            responseAdd: "",
            locations: [],
            responseVisited: "",
            idVisited: "",
            isvisited: ""
            

        }
    },
    template: `
        
    `, 
    methods:{
        get(){
            fetch(`${this.API_URL}/locations`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.locations = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        create(){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": parseFloat(this.lat),
                "lng": parseFloat(this.lng),
                "visited": 0,
                "location_id": this.$route.params.id
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { 
                method: "POST",
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
                    this.initForm()
                    this.responseAdd = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        visited(){
            let data = {
                "visited": this.isvisited
                
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${idVisited}`, { 
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
        console.log(`${this.API_URL}/locations/${this.$route.params.id}/places`);
        fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}


// <select name="location_id" v-model="location_id">
//                 <option value="location.id" v-for="location in locations">{{location.name}}</option>
//             </select>
//             <div v-if="responseAdd.location_id">
//                 <p v-for="response in responseAdd.location_id">{{response}}</p>
//             </div>