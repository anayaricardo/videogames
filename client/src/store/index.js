import { createStore, applyMiddleware } from "redux"; // Sirve para crear el store y aplicar middleware
import { composeWithDevTools } from "redux-devtools-extension"; // Sirve para ver los cambios en el estado de la aplicación
import thunk from "redux-thunk"; // middleware for async actions
import rootReducer from "../reducer"; // Sirve para importar el reducer

const store = createStore( // crea un store con redux
  rootReducer, // el reducer
  composeWithDevTools(applyMiddleware(thunk)) // con redux dev tools
);

export default store;
