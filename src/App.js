import "./App.css";
import { useEffect, useState } from "react";
import { getData } from './services';
import Header from "./components/header";

function App() {

  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPageData(page)
  }, [])
  
  useEffect(() => {
    
    if (page > 1) {
      getPageData(page)
    }
  console.log(page)
   
  }, [page])
  

  const getPageData = (pagenum) => {
    setIsLoading(true);
    getData(pagenum).then((resp) => {
      if(resp && resp.length > 0)
      setPageData(prevData => [...prevData, ...resp]);
    })
    setIsLoading(false);
  }
   
  useEffect(() => {
    function handleScroll() {
      if (isScrollEnd().end) {
      //  getPageData(page + 1)
        setPage((prev) => prev + 1)
      }
      else if (isScrollEnd().start) {
      }
    }

    function isScrollEnd() {
      const windowHeight = window.innerHeight; 
      const documentHeight = document.documentElement.scrollHeight; 
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop; 

      const distanceToEnd = documentHeight - (scrollPosition + windowHeight);

      
      const threshold = 10;
      return {end: distanceToEnd <= threshold, start: scrollPosition === 0};
    }


    window.addEventListener('scroll', handleScroll);

  }, []);
  
  return(
    <>
       <Header/>

      {pageData && pageData.length > 0 && pageData.map((item, key) => {
        return (
          <div className="card">
          <span className="image-container">
            <img src={item.node && item.node.ImageStyle_thumbnail} alt="Profile" />
          </span>
          <div className="details">
              <h2>{item.node && item.node.title}</h2>
              <p>{item.node && item.node.last_update && new Date(item.node.last_update).toLocaleString()}</p>
          </div>
          </div>
     )
      })}
    
      {isLoading && <div>Loading...</div>}
    </>
  );
}

export default App;
