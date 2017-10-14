/* generates a map of tags to arrays of milliseconds like so:
    {
        "drink": [1000, 4000, 5000]
        "car": [1000, 4000]
        "bus": [2000, 6000, 3000, 16000]

        etc..
    }
*/

import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: 'be5a7ee646c14bb0ac0e5f6f0baabb7f'
});

// You can also use the SDK by adding this script to your HTML:
//<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>


export function parseResponseToTagMap(response) {
    const threshold = 0.8;
    const tagMap = {};
    console.log(response);

    if (response.status.description === "Ok") {

        response.outputs[0].data.frames.forEach((frame, index) => {
            frame.data.concepts.forEach((c, index) => {
                if (c.value > threshold) {
                    if (!(c.name in tagMap)) {
                        tagMap[c.name] = [];
                    }
                    tagMap[c.name].push(frame.frame_info.time);
                }
            });
        });
    } else {
        console.log("error");
    }

    return tagMap;

}

export function makeAPIRequest(data) {
    
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: data}, {video: true})
    .then(function(response) {
        return response;
    })
    .catch(function(err) {
        console.log(err);
        return null;
    });
}

