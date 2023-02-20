

const options = {
    data(){
        return {
            
        };
    },
    template: `
        <div class="locations">
            <i
            
        </div>
    `,
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);

        })

    }
}

Vue.createApp(options).mount("#app")