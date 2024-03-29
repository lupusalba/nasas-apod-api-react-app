import { useEffect, useState } from 'react';
import './App.css';

// Add background color change on new date, based on avreage color of new image
// add date change based on input date

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
  console.log(currentDate)

  const [inputDate, setInputDate] = useState(currentDate)

  const [showInfo, setShowInfo] = useState(false)


  const handleChange = () => {
    const d = document.getElementById("userDate")
    const newDate = d.value
    // console.log("handle change newDate" + newDate)
    setInputDate(newDate)
    console.log("handle change inputdate" + inputDate)
  }

  useEffect((inputDate) => {
    const getImage = (inputDate) => {
      let url = api.base + api.key
      try {
        //console.log(`"https://api.nasa.gov/planetary/apod?api_key=bFNqkMyCnMATKhSuyIfHmmhqUNF7gVnJNwo2Loha"`)               
        fetch(`${url}`)//yyyy-mm-dd
          .then(response => response.json())
          .then(json => {
            console.log(json)
            setApodData(json)
          })
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])



  const toggleInfo = () => {
    let position = document.getElementById("change")
    setShowInfo(prev => !prev)
    if (showInfo === false) {
      position.style.opacity = "1"
    } else {
      position.style.opacity = "0"
    }
  }

  const background = {
    backgroundImage: 'url(' + apodData.hdurl + ')'

  }


  return (
    <div id="App" className="App" >

      <div className="main" style={background} >

        <div className="header">
          <h1 className="siteTitle">Nasa's apod api app</h1>
          <button id="btn-toggle" onClick={toggleInfo}>Show / Hide Info</button>

          {/* <form>
          
          <input
            type="date"
            id="userDate"
            name="inputDate"
            value={inputDate}
            onChange={handleChange}
          />
        </form> */}


        </div>



        <div id="change" className=" descriptionInfo">
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
