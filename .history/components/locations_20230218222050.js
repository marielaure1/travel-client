export default {
    props: ["API_URL"],
    data(){
        return {
            locations: []

        }
    },
    template: `<div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}" class="card" v-for="location in locations" :key="location.updated_at">
            <div>
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </div>
        </router-link>
    </div>
    <form @submit.prevent="create">
        <input type="text" name="name" placeholder="Nom du lieu/ville">
        <input type="text" name="lat" placeholder="Latitude">
        <input type="text" name="lng" placeholder="Longitude">
        <button type="submit">Ajouter</button>
    </form>
    `, 
    method: {
        create(){
            fetch(`${this.API_URL}/locations`, 
            { method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) 
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
        }
    },
    mounted(){
        fetch(`${this.API_URL}/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.locations = json
        })

    }
}