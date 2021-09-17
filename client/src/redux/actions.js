import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID  = 'GET_BY_ID';
export const GET_BY_WEIGHT = 'GET_BY_WEIGHT';
export const GET_BY_CREATED = 'GET_BY_CREATED';
export const GET_BY_ALPHABET = 'GET_BY_ALPHABET';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_BY_TEMPERAMENTS = 'GET_BY_TEMPERAMENTS';
export const POST_DOG = 'POST_DOG';

export function getDogs() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS, 
            payload: json.data
        })
    }
}

export function getByName(name) {
    return async function(dispatch) {
       
            const json = await axios.get('http://localhost:3001/dogs?name=' + name );
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            });
    }
}

export function getByWeight(payload) {
    return {
        type: GET_BY_WEIGHT,
        payload: payload
    };
};


export function getByCreated(payload) {
    console.log("action gByC", payload)
    return (dispatch) => {
        return dispatch( {
            type: GET_BY_CREATED,
            payload
        });
    }
  
};


export function getByAlphabet(payload) {
    console.log(payload)
    return {
        type: GET_BY_ALPHABET,
        payload
    }
}

export function getTemperaments() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        });
    };
};

export function getByTemperaments(temp) {
    console.log("action gByT", temp)
    return async function(dispatch) {
        return dispatch ({ 
        type : GET_BY_TEMPERAMENTS,
        payload: temp
        })
    }
}

export function getById(id) {
    console.log("action gBID", id)
    if(id.length>4) {
        return async function(dispatch) {
            console.log("aaaaAAAAAA")
            const json = await axios.get(`http://localhost:3001/dog?id=${id}`);
            console.log(json.data, "json")
            return dispatch({
                type: GET_BY_ID,
                payload: json.data
            });
    };
    }
    return async function(dispatch) {
            const json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: GET_BY_ID,
                payload: json.data.pop()
            });
    };
};
 

export function postDog(payload) {
    console.log("action pD", payload)
    return async function(dispatch) {
        const json = await axios.post('http://localhost:3001/dogs', payload)
        console.log("hola", json.data)
        return  dispatch({
            type: POST_DOG
        });
    };
};

