import Results from "./results.js"

console.log(Results);


const options = {
    data(){
        return {
            
        };
    },
    mounted(){


        fetch(`https://api.frankfurter.app/currencies`)
        .then(response => response.json())
        .then(json => {
            
            this.devises = json
        })
    }
}

Vue.createApp(options).mount("#app")