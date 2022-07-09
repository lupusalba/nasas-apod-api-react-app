import { useEffect, useState } from 'react';
import './App.css';

// API KEY = bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha
// https://api.nasa.gov/planetary/apod?api_key=bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha

// fetch("https://api.nasa.gov/planetary/apod?api_key=bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha")
//         .then(response => response.json())
//        .then(json => {
//         console.log(json.copyright)
//     })


function App() {

  const api = {
    base: "https://api.nasa.gov/planetary/apod?api_key=",
    key: "bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha"
  }

  const [apodData, setApodData] = useState({})



  useEffect( () => {
    const getImage = () => {
      try {
        fetch(`${api.base}${api.key}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setApodData(json)
          })
        console.log(`${api.base}${api.key}`)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])


  const background = {
    backgroundImage: 'url(' + apodData.hdurl + ')'

  }


  return (
    <div className="App" >
      
      <div className="main" style={background} >

        <div className="header">
        <h1 className="siteTitle">Nasa's apod api app</h1>
          <form>
            <label className="label" htmlFor="datePicker">Pick a date:</label>
            <input
              type="date"
              id="datePicker"
              className="datePicker"
              //name={datePicker}
              //onChange={handelChange}
            />
          </form>
        </div>

        <div className="descriptionInfo">
          <div className="imageTitle">{apodData.title}</div>
          <div className="imageDate">{apodData.date}</div>
          <div className="imageAuthor">{apodData.copyright}</div>
          <div className="imageDescription">{apodData.explanation}</div>
        </div>










      </div>


    </div>
  );
}

export default App;
