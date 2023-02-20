

const options = {
    data(){
        return {
            
        };
    },
    mounted(){


        fetch(`http://localhost:8000/api/locations`, )
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
        })
    }
}

Vue.createApp(options).mount("#app")