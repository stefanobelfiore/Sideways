import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import './styles/button.css'
import phoenix9 from "./phoenix9.png"
import sideways from "./sideways.png"
import useInterval from './utils';

function Home() {

  const [id, setId] = useState("")
  const [position, setPosition] = useState("")
  const [currentState, setCurrentState] = useState("")
  const [destination, setDestination] = useState("")
  const [changedState, setChangedState] = useState(false)
  const [deleteJourney, setDeleteJourney] = useState(false)
  // fetch get que se actualiza cada segundo-------------------------------------
  const downloadStateSideway = () => {
    let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Accept', 'application/json');

  fetch("http://127.0.0.1:5000/journey", {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      headers: headers
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log(response.statusText);
        throw Error(response.statusText);
      }
      console.log(response.ok);
      console.log(response.status);
      return response.json();
    })
    .then(data => {
      setId(data.id)
      setDestination(data.destination);
      setCurrentState(data.currentState)
      setPosition(data.position)
      console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
      //error handling
      console.log(error);
    });
  }
  // fetch que manda el destino al presionar el botón--------------------------------
  const setStateSideway = () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Accept', 'application/json');

    fetch("http://127.0.0.1:8080/destination", {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(destination),
      headers: {
        "Content-Type": "application/json",
        headers: headers
      }
    })
      .then(response => {
        console.log(response.ok); // will be true if the response is successfull
        console.log(response.status); // the status code = 200 or code = 400 etc.

        return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }
  //fetch que cancela el viaje------------------------------
const delJourney = () => {

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Accept', 'application/json');

  fetch("http://127.0.0.1:8080/delete/destination", {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      headers: headers
    }
  })
    .then(response => {
      console.log(response.ok); // will be true if the response is successfull
      console.log(response.status); // the status code = 200 or code = 400 etc.

      return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
      //here is were your code should start after the fetch finishes
      console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
      //error handling
      console.log(error);
    });

}

  useInterval(() => {
    downloadStateSideway() 
  }, 1000);

  useEffect(()=>{
    delJourney()
  },[deleteJourney])

  useEffect(() => {
    setStateSideway()
  }, [changedState]);



  return (
    <div className="App">
      <div className="top-page">
        <div className="logo-sideways">
          <div className="usuario-div">
            <img className="image-file-sideways" src={sideways} alt="" />
            <div className="usuario">
              <div className="usuario-title"><p>Usuario</p></div>
              <div><p>oncologia@hm.puertadelsur</p></div>
            </div>
          </div>
        </div>
        <div className="salir-div"><button onClick={() => {
          window.location.reload(false);
        }} className="salir-button">Salir</button></div>
      </div>
      <div className="central-page">
        <div className="buttons-list">
          <p className="selecciona-destino">Selecciona un nuevo destino </p>
          <div className="first-button-blue"><button onClick={() => { setDestination("Farmacia");setChangedState(!changedState) }} className="blue-button">Farmacia</button></div>
          <div className="second-button-blue"><button onClick={() => { setDestination("Radiologia");setChangedState(!changedState) }} className="blue-button">Radiologia</button></div>
          <div className="third-button-blue"><button onClick={() => { setDestination("Oncologia");setChangedState(!changedState) }} className="blue-button">Oncologia</button></div>
          <div><button onClick={() => { setDeleteJourney(!deleteJourney) }} className="orange-button">CANCELAR DESTINO</button></div>
        </div>
        <div className="sideways-details">
          <div className="image-sideway">
            <img className="image-file-phoenix9" src={phoenix9} alt="" />
          </div>
          <div className="informations">
            <div className="id">
              <div className="fit-div-content">ID: </div> <div>{id}</div>
            </div>
            <div className="position">
              <div className="fit-div-content">Ubicación: </div><div>{position}</div>
            </div>
            <div className="current-state">
              <div className="fit-div-content">Estado: </div><div>{currentState}</div>
            </div>
            <div className="destination">
              <div className="fit-div-content">Destino: </div><div>{destination}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
