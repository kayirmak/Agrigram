import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../../hoc/AuthProvider";
import { CartProvider } from "../../hoc/CartProvider";

import router from "../../router/router";

import "./App.css";

function App() {
	return <AuthProvider>
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>
	</AuthProvider>
}

export default App;
