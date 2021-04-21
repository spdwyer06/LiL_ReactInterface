import { initial } from 'lodash';
import {useState} from 'react';
import {FaPlus} from 'react-icons/fa';


const AddAppointments = (props) => {
    const [petName, setPetName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [aptDate, setAptDate] = useState('');
    const [aptTime, setAptTime] = useState('');
    const [aptNotes, setAptNotes] = useState('');


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        // Capitalizing the first letter of the name (ex petName => PetName)
        const stateNameCap = name.charAt(0).toUpperCase() + name.slice(1);
        // Adding the 'set' word in front to complete the setMethod (ex PetName => setPetName)
        const setMethod = `set${stateNameCap}`;
        
        /*
            IF DONE IN CLASS COMPONENT:

            this.setState({
                [name]: value
            });

        */


        if(setMethod == 'setPetName')
            setPetName(value);
        else if(setMethod == 'setOwnerName')
            setOwnerName(value);
        else if(setMethod == 'setAptDate')
            setAptDate(value);
        else if(setMethod == 'setAptTime')
            setAptTime(value);
        else
            setAptNotes(value);
        
        // set[stateNameCap](value);
        
        // console.log(setMethod);
        // console.log(stateNameCap);
    }

    const handleSubmit = (e) => {
        // Prevent the form from submitting and reloading the page
        e.preventDefault();
        let tempAppointment = {
            petName: petName,
            ownerName: ownerName,
            aptDate: aptDate + ' ' + aptTime,
            aptNotes: aptNotes
        };

        props.addAppointment(tempAppointment);

        clearStateVariables();

        props.toggleFormDisplay();
    };

    const clearStateVariables = () => {
        setPetName('');
        setOwnerName('');
        setAptDate('');
        setAptTime('');
        setAptNotes('');
    }


    return(
        // <div className="card textcenter mt-3 add-appointment">
        <div className={'card textcenter mt-3 ' + (props.formDisplayOn ? '' : 'add-appointment')}>
        <div className="apt-addheading card-header bg-primary text-white" onClick={() => props.toggleFormDisplay()}>
          <FaPlus /> Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={handleSubmit}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly
              >
                Pet Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  value ={petName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  value ={ownerName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value ={aptDate}
                  onChange={handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value ={aptTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  value ={aptNotes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AddAppointments;