export default {
    props: ["API_URL"],
    data(){
        return {
            location: ""
        };
    },
    template: `
        <div class="location">
            <h2>{{location.name}}</h2>
           
        </div>
        <router-view></router-view>
    `,
    methods: {
        delete(){
           console.log("test")
        }
    },
    mounted(){
        fetch(`${this.API_URL}/locations/${this.$route.params.id}`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.location = json
        })
    }
}