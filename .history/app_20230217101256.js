import Results from "./results.js"

console.log(Results);


const options = {
    data(){
        return {
            
        };
    },
    mounted(){


        fetch(`http://localhost:8000/api/locations`)
        .then(response => response.json())
        .then(json => {
            
            this.devises = json
        })
    }
}

Vue.createApp(options).mount("#app")