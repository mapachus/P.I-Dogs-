
import { GET_DOGS, GET_BY_NAME, GET_BY_ID, GET_BY_WEIGHT, GET_BY_CREATED, GET_BY_ALPHABET, GET_TEMPERAMENTS, GET_BY_TEMPERAMENTS, POST_DOG } from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  details: []
} ;

function rootReducer (state = initialState, action) {

switch(action.type) {
    case GET_DOGS: 
    return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
    }
    case GET_BY_NAME:
      return {
        ...state,
        dogs: action.payload
      }
    case GET_BY_ID:
    console.log("reducer gBID", action.payload)
    return {
      ...state,
      details: action.payload
    }
    case GET_BY_CREATED:
    console.log("reducer gBC", action.payload)
    const dbFilter = action.payload === 'DB'? state.allDogs.filter(d => d.id.length>3) : state.allDogs.filter(d => d.id.toString().length<4)
            return {
                    ...state,
                    dogs: action.payload === 'All' ? state.alldogs : dbFilter
                }
        // const dbFilter = action.payload === 'DB' ? 
        // state.allDogs.filter(d => d.createdInDb) : 
        // state.allDogs.filter(d => !d.createdInDb);
        // console.log("reducer",dbFilter)
        //     return {
        //         ...state,
        //         dogs: action.payload === 'All' ? state.allDogs : dbFilter
        //     }
    case GET_BY_ALPHABET:
       
      const dogOrder = action.payload === 'Asc' ?
      state.allDogs.sort(function(a, b) {
          if(a.name > b.name) {
              return 1;
          }
          if(b.name > a.name) {
              return -1;
          }
          return 0;
      }) :
      state.allDogs.sort(function(a, b) {
          if(a.name > b.name) {
              return -1;
          }
          if(b.name > a.name) {
              return 1;
          }
          return 0;
      });
      return {
          ...state,
          dogs: dogOrder
      }
      case GET_BY_WEIGHT:
        let sorted_Arr = action.payload === 'aWeight'?
            state.dogs.sort(function (a, b) {
               
                let na = parseInt(a.weight.replace('-','').substr(0,2))
                let nb = parseInt(b.weight.replace('-','').substr(0,2))
              
                if (na > nb) {
                    return -1;
                }
                if (na < nb) {
                    return 1;
                }
                return 0;
            })
            : state.dogs.sort(function (a, b) {
                return parseInt(a.weight.replace('-','').substr(0,2)) - parseInt(b.weight.replace('-','').substr(0,2))
            });
      return {
        ...state,
        dogs: sorted_Arr,
      };

    case GET_TEMPERAMENTS:
        return {
            ...state,
            temperaments: action.payload
        }    
    case GET_BY_TEMPERAMENTS:
        console.log("reducer gBT", action.payload)
      const mood = state.allDogs.filter(d => d.temperament && d.temperament.split(", ").find((t) => t === action.payload));
      console.log("mood", mood)
        return {
           ...state,
           dogs: mood
        }
    case POST_DOG:
        console.log("reducer pD", action.payload)
        return {
            ...state
            }
    default:
    return state;
    
}

}

export default rootReducer;