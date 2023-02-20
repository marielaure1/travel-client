

const options = {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations">
            <div class="card">
                <h3></h3>
            </div>
            
        </div>
    `,
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           json

        })

    }
}

Vue.createApp(options).mount("#app")