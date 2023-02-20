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
    methods:{
        show(){
            fetch(`${API_URL}/locations/`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            this.locations = json
            })
        }
    },
    mounted(){
        console.log($route.params.);
    }
}