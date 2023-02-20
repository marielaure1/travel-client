export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: ""

        }
    },
    template: `
        <div class="places" v-if="places.length">
            
                <div v-for="place in places" :key="place.updated_at">
                    <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"/>
                    <label for="place-input">
                        <router-link :to="{ name: 'place', params: { slugplace: place.slug, id : place.id }}">{{ place.name }}</router-link>
                    </label>
                    

                </div>
            
        </div>
    `, 
    mounted(){
      
    }
}