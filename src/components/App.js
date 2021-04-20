import {useState, useEffect} from 'react';

import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

function App() {

  // const [myName, setMyName] = useState('Sean');
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    fetchSeedData();
  }, []);
  
  const fetchSeedData = async() => {
    const res = await fetch('./seedData.json');
    const result = await res.json();
    const appointments = result.map(item => {
      return item;
    });
    setMyAppointments(appointments);
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
            <AddAppointments />
            <SearchAppointments />
            <ListAppointments appointments={myAppointments} />
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
