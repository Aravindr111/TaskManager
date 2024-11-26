import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Header from "./homecomponents/header"
import EventsList from "./homecomponents/EventsList";
import AddEventModal from "./homecomponents/AddEvent";
import './homecomponents/Home.css'


function Home(){
const [isModalOpen, setModalOpen] = useState(false);

  
  const openModal = () => setModalOpen(true);

  
  const closeModal = () => setModalOpen(false);


    return(
        <div className='home'>
        <Header/>
        <div className="App">
          <div className='buttons'>
        <div className='events'>
       <button className="add-event-button" onClick={openModal}>
        Add Event
       </button>
       <AddEventModal isOpen={isModalOpen} onClose={closeModal} />
       
       </div>
       </div>
       <Link to="/Search" id="search">Search</Link>
       </div>
        <EventsList/>
        </div>

    )
}

export default Home;