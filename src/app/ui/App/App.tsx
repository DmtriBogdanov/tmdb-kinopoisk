import s from './App.module.css'
import {Routing} from "@/common/routing";
import {Footer, Header, LinearProgress} from "@/common/components";
import {useSelector} from "react-redux";
import type {RootState} from "@/app/model/store";
import {useEffect} from "react";
import {ScrollToTop} from "@/common/components/ScrollToTop/ScrollToTop";
import {useGlobalLoading} from "@/common/hooks";
import "react-loading-skeleton/dist/skeleton.css";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";


function App() {
  const theme = useSelector((state:RootState) => state.theme.mode)
  const isGlobalLoading = useGlobalLoading();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={s.app}>
      <Header/>
      {isGlobalLoading && <LinearProgress />}
      <ScrollToTop/>
      <main className={s.app__main}>
        <Routing/>
      </main>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App
