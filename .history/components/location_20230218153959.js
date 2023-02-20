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
            fetch(`http://localhost:8000/api/locations/${}`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                
            console.log(json);
            this.locations = json
            })
        }
    },
    
}