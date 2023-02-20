import Results from "./results.js"

console.log(Results);


const options = {
    data(){
        return {
            
        };
    },
    components: {
        Results: Results
    },
}

Vue.createApp(options).mount("#app")