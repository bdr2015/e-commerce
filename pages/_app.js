import Header from "../components/Header";
import './global.css';
import { Provider } from "react-redux";
import store from '../store/store'
export default function App({ Component, pageProps: {...pageProps} }) {
  return (
    <>
      <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      </Provider>
    </>

    )
}
