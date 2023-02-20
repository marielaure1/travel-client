export default {
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
            <a href="/{{ locations.slug }}" class="card" v-for="location in locations" :key="location.updated_at">
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </a>
        </div>
    `,
    mounted(){

        fetch(`http://localhost:8000/api/locations/$i`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           this.locations = json
        })

    }
}