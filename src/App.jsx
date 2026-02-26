import { useState } from 'react';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('add');
  
  // Form states
  const [doctorForm, setDoctorForm] = useState({
    doctorId: '',
    specialization: '',
    maxDailyPatients: ''
  });
  
  const [bookingSpecialization, setBookingSpecialization] = useState('');
  const [message, setMessage] = useState('');

  // Add Doctor
  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    if (doctors.find(d => d.doctorId === doctorForm.doctorId)) {
      setMessage('Error: Doctor ID already exists!');
      return;
    }

    const newDoctor = {
      doctorId: doctorForm.doctorId,
      specialization: doctorForm.specialization,
      maxDailyPatients: parseInt(doctorForm.maxDailyPatients),
      currentAppointments: 0
    };

    setDoctors([...doctors, newDoctor]);
    setMessage(`Success: Dr. ${doctorForm.doctorId} added successfully!`);
    setDoctorForm({ doctorId: '', specialization: '', maxDailyPatients: '' });
  };

  // Book Appointment
  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    const availableDoctors = doctors.filter(
      d => d.specialization.toLowerCase() === bookingSpecialization.toLowerCase() 
        && d.currentAppointments < d.maxDailyPatients
    );

    if (availableDoctors.length === 0) {
      setMessage(`Error: No available doctors for ${bookingSpecialization}. All doctors are fully booked!`);
      return;
    }

    // Find doctor with fewest appointments
    const selectedDoctor = availableDoctors.reduce((min, doctor) => 
      doctor.currentAppointments < min.currentAppointments ? doctor : min
    );

    // Update doctor's appointment count
    setDoctors(doctors.map(d => 
      d.doctorId === selectedDoctor.doctorId 
        ? { ...d, currentAppointments: d.currentAppointments + 1 }
        : d
    ));

    // Add appointment record
    const newAppointment = {
      id: Date.now(),
      doctorId: selectedDoctor.doctorId,
      specialization: selectedDoctor.specialization,
      timestamp: new Date().toLocaleString()
    };
    
    setAppointments([...appointments, newAppointment]);
    setMessage(`Success: Appointment booked with Dr. ${selectedDoctor.doctorId} (${selectedDoctor.specialization})`);
    setBookingSpecialization('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏥 Hospital Appointment Scheduler</h1>
        <p>Fair and efficient doctor appointment allocation system</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'add' ? 'active' : ''} 
          onClick={() => setActiveTab('add')}
        >
          Add Doctor
        </button>
        <button 
          className={activeTab === 'view' ? 'active' : ''} 
          onClick={() => setActiveTab('view')}
        >
          View Doctors
        </button>
        <button 
          className={activeTab === 'book' ? 'active' : ''} 
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </button>
        <button 
          className={activeTab === 'appointments' ? 'active' : ''} 
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </nav>

      {message && (
        <div className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <main className="content">
        {activeTab === 'add' && (
          <div className="panel">
            <h2>Add New Doctor</h2>
            <form onSubmit={handleAddDoctor} className="form">
              <div className="form-group">
                <label>Doctor ID *</label>
                <input
                  type="text"
                  value={doctorForm.doctorId}
                  onChange={(e) => setDoctorForm({...doctorForm, doctorId: e.target.value})}
                  placeholder="e.g., DOC001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Specialization *</label>
                <input
                  type="text"
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                  placeholder="e.g., Cardiology"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Max Daily Patients *</label>
                <input
                  type="number"
                  min="1"
                  value={doctorForm.maxDailyPatients}
                  onChange={(e) => setDoctorForm({...doctorForm, maxDailyPatients: e.target.value})}
                  placeholder="e.g., 10"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary">Add Doctor</button>
            </form>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="panel">
            <h2>All Doctors ({doctors.length})</h2>
            {doctors.length === 0 ? (
              <p className="empty-state">No doctors added yet. Add a doctor to get started.</p>
            ) : (
              <div className="table-container">
                <table className="doctors-table">
                  <thead>
                    <tr>
                      <th>Doctor ID</th>
                      <th>Specialization</th>
                      <th>Max Patients</th>
                      <th>Current Appointments</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map(doctor => (
                      <tr key={doctor.doctorId}>
                        <td style={{color: '#333', fontWeight: '500'}}>{doctor.doctorId || 'N/A'}</td>
                        <td style={{color: '#555'}}>{doctor.specialization || 'N/A'}</td>
                        <td style={{color: '#555'}}>{doctor.maxDailyPatients || 0}</td>
                        <td style={{color: '#555'}}>{doctor.currentAppointments || 0}</td>
                        <td>
                          <span className={`status ${doctor.currentAppointments < doctor.maxDailyPatients ? 'available' : 'full'}`}>
                            {doctor.currentAppointments < doctor.maxDailyPatients ? 'Available' : 'Full'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'book' && (
          <div className="panel">
            <h2>Book Appointment</h2>
            <form onSubmit={handleBookAppointment} className="form">
              <div className="form-group">
                <label>Specialization Required *</label>
                <input
                  type="text"
                  value={bookingSpecialization}
                  onChange={(e) => setBookingSpecialization(e.target.value)}
                  placeholder="e.g., Cardiology"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary">Book Appointment</button>
            </form>

            <div className="info-box">
              <h3>How it works:</h3>
              <ul>
                <li>Enter the required specialization</li>
                <li>System finds doctors with that specialization</li>
                <li>Allocates doctor with fewest current appointments</li>
                <li>Rejects if all doctors are fully booked</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="panel">
            <h2>Appointment History ({appointments.length})</h2>
            {appointments.length === 0 ? (
              <p className="empty-state">No appointments booked yet.</p>
            ) : (
              <div className="appointments-list">
                {appointments.slice().reverse().map(apt => (
                  <div key={apt.id} className="appointment-card">
                    <div className="apt-header">
                      <span className="apt-id">#{apt.id}</span>
                      <span className="apt-time">{apt.timestamp}</span>
                    </div>
                    <div className="apt-details">
                      <p><strong>Doctor:</strong> {apt.doctorId}</p>
                      <p><strong>Specialization:</strong> {apt.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Hospital Appointment Scheduler - Round 2 Assignment</p>
      </footer>
    </div>
  );
}

export default App;
