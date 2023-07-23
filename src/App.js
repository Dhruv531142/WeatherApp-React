import './App.css';
import {useState} from 'react';


function App() {
  const[value,Setvalue]=useState({city:""})
  const onChange=(e)=>{
    Setvalue({...value,[e.target.name]:e.target.value})
    
  }
  const [weth,setweth]=useState(null)
  async function fetchMoredata(){
    let url = `http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=5e2563a9fa6890dfdfd7b85987b1d5ad&q=${value.city}`
    let data = await fetch(url)
    let parsedData = await data.json()
    setweth(parsedData)
  }
  return (
    <>
    <section className="hero is-primary">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    What's the weather like?
                </h1>
            </div>
        </div>
    </section>
    <section className="section">
        <div className="container">
            <div className="columns">
                <div className="column is-offset-4 is-4">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input type="text" placeholder="Enter City Name" name='city' style={{height: "100%",
                                width: "100%"}} onChange={onChange}/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info" onClick={fetchMoredata}>
                                    Search
                                </button>
                            </div>
                        </div>
                            {/* <div className="notification {{message_class}}">{{message}}</div> */}
                </div>
            </div>
        </div>
    </section>
    {weth&&<section className="section">
        <div className="container">
            <div className="columns">
                <div className="column is-offset-4 is-4">
                    <div className="box">
                        <article className="media">
                            <div className="media-left">
                                <figure className="image is-50x50">
                                    <img src={"http://openweathermap.org/img/w/"+weth['weather'][0]['icon']+".png"} alt="weather"/>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <span className="title">{weth.name}</span>
                                        <br/>
                                        <span className="subtitle">{Math.round((weth['main']['temp']-32)/1.8)}° C</span>
                                        <br/> {weth['weather'][0]['description']}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>}
    </>
  );
}

export default App;
