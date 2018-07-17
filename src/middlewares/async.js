// // middleware called with an object with a few properties
// export default function({ dispatch }) {

//   // single argument of next function a reference to the next middleware in
//   // the chain
//   return function(next) {

//     // action returned from the action creator with possible payload
//     return function(action) {

//     }
//   }
// }

// ES6 syntactic sugar
export default ({ dispatch }) => next => action => {
  // Check to see if the action has a promise on its payload prop
  // If it does, then wait for it to resolve
  // If it doesnt then sent the action on to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // We want to wait for the promise to resolve (get its data) and then create
  // a new action with that data and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};