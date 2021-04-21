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
  const [formDisplayOn, setFormDisplayOn] = useState(false);
  const [orderBy, setOrderBy] = useState('petName');
  const [orderDirection, setOrderDirection] = useState('asc');

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


  let order;
  let filteredAppointments = myAppointments;
  if(orderDirection == 'asc')
    order = 1;
  else
    order = -1;

  filteredAppointments.sort((aptOne, aptTwo) => {
    if(aptOne[orderBy].toLowerCase() < aptTwo[orderBy].toLowerCase())
      return -1 * order;
    else
      return 1 * order;
  })

  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            {/* {myName} */}
            {/* {petName} */}
            <AddAppointments formDisplayOn={formDisplayOn} toggleFormDisplay={toggleFormDisplay} addAppointment={addAppointment} />
            <SearchAppointments orderBy={orderBy} orderDirection={orderDirection} />
            {/* <ListAppointments appointments={myAppointments} deleteAppointment={deleteAppointment} /> */}
            <ListAppointments appointments={filteredAppointments} deleteAppointment={deleteAppointment} />
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
