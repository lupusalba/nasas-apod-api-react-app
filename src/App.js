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

  
  
  const currentDate = new Date().toISOString().slice(0, 10);

  const [inputDate, setInputDate] = useState("2022-07-01")


  console.log("current date: " +currentDate)
  console.log("input date: " +inputDate)

  //console.log(dateInput)
  //console.log(`${api.base}${api.key}`)

  const handleChange = () => {
    const d = document.getElementById("userDate")
    const newDate = d.value
    console.log(newDate)
    setInputDate(newDate)
  }

  useEffect((inputDate) => {
    const getImage = (inputDate) => {
      let url = api.base + api.key + "&date=" + inputDate
      try {         //https://api.nasa.gov/planetary/apod?api_key=bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha&date=${inputDate}                   
        fetch(url)//yyyy-mm-dd
          .then(response => response.json())
          .then(json => {
            console.log(json)
            setApodData(json)
          })
        //console.log(`${api.base}${api.key}`)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [inputDate])





const background = {
  backgroundImage: 'url(' + apodData.hdurl + ')'

}


return (
  <div className="App" >

    <div className="main" style={background} >

      <div className="header">
        <h1 className="siteTitle">Nasa's apod api app</h1>
        <form>
          
          <input
            type="date"
            id="userDate"
            name="inputDate"
            value={inputDate}
            onChange={handleChange}
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
