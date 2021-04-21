import {useState, useEffect} from 'react';

import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import {without} from 'lodash';

function App() {

  // const [myName, setMyName] = useState('Sean');
  const [myAppointments, setMyAppointments] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [formDisplayOn, setFormDisplayOn] = useState(false)

  useEffect(() => {
    fetchSeedData();
  }, []);
  
  const fetchSeedData = async() => {
    const res = await fetch('./seedData.json');
    const result = await res.json();
    const appointments = result.map(appointment => {
      appointment.Id = lastIndex;
      setLastIndex(lastIndex + 1);
      return appointment;
    });
    setMyAppointments(appointments);
  }

  const deleteAppointment = (appointment) => {
    let tempAppointments = myAppointments;
    // console.log(myAppointments.length);
    tempAppointments = without(tempAppointments, appointment);
    // console.log(myAppointments.length);
    setMyAppointments(tempAppointments);
  }

  const toggleFormDisplay = () => setFormDisplayOn(!formDisplayOn);

  const addAppointment = (appointment) => {
    let tempAppointments = myAppointments;
    appointment.Id = lastIndex;
    tempAppointments.unshift(appointment);

    setMyAppointments(tempAppointments);
    setLastIndex(lastIndex + 1);
  }

  // const petName = myAppointments.map(appointment => (
  //   <div>{appointment.petName}</div>
  // ));

  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            {/* {myName} */}
            {/* {petName} */}
            <AddAppointments formDisplayOn={formDisplayOn} toggleFormDisplay={toggleFormDisplay} addAppointment={addAppointment} />
            <SearchAppointments />
            <ListAppointments appointments={myAppointments} deleteAppointment={deleteAppointment} />
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
