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

  
  // let src = "https://apod.nasa.gov/apod/image/2207/CatsEye_HubbleVillaVerde_960.jpg"
  // const getAverageRgb = (src) => {
  //   console.log("src: " + src)
  //   const context = document.createElement("canvas").getContext("2d");
  //   if(typeof src === "string"){
  //     const img = new Image()
  //     img.setAttribute("crossOrigin", "")
  //     img.src = apodData.hdurl
  //     img.onload = () => {
  //       context.imageSmoothingEnabled = true
  //       context.drawImage(img, 0,0,1,1)
  //       console.log(context.getImageData(1,1,1,1).data.slice(0,3))
  //     }
  //   }
  // }
  // getAverageRgb(src)
  

  const toggleInfo = () => {
    let position = document.getElementById("change")
    setShowInfo(prev => !prev)
    if(showInfo === false) {
      position.style.visibility = "hidden"
      console.log(position)
    } else {
      position.style.visibility = "visible"
    }
  }

const background = {
  backgroundImage: 'url(' + apodData.hdurl + ')'

}


return (
  <div className="App" >

    <div className="main" style={background} >

      <div className="header">
        <h1 className="siteTitle">Nasa's apod api app</h1>
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

      <button onClick={toggleInfo}>Show info</button>

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
