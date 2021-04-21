import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';

const ListAppointments = (props) => {

    return(
        <div className="appointment-list item-list mb-3">
        {props.appointments.map(appointment => (
            <div className="pet-item col media py-3" key={appointment.Id}>
                <div className="mr-3">
                    <button className="pet-delete btn btn-sm btn-danger" onClick={() => props.deleteAppointment(appointment)}>
                        <FaTimes />
                    </button>
                    
                </div>

            <div className="pet-info media-body">
                <div className="pet-head d-flex">
                    <span className="pet-name" contentEditable suppressContentEditableWarning onBlur={(e) => props.updateInfo('petName', e.target.innerText, appointment.Id)}>{appointment.petName}</span>
                    <span className="apt-date ml-auto">
                        {/* Moment requires 3 props: 
                            date => the date you want formatted
                            parse => current format of given date
                            format => how you want the date to be formatted
                        */}
                        <Moment date={appointment.aptDate} parse="YYYY-MM-DD hh:mm" format="MMM-D h:mma" />
                    </span>
                </div>

                <div className="owner-name">
                    <span className="label-item" >Owner: </span>
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => props.updateInfo('ownerName', e.target.innerText, appointment.Id)}>{appointment.ownerName}</span>
                </div>
            
                <div className="apt-notes" contentEditable suppressContentEditableWarning onBlur={(e) => props.updateInfo('aptNotes', e.target.innerText, appointment.Id)}>{appointment.aptNotes}</div>
            </div>
        </div>
        ))}
    </div>
    );
}

export default ListAppointments;