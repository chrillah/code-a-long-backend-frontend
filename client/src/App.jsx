import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

function App() {

    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)


    // Hämtar information från swerver/backend som skapar en ansluting till databasen
    useEffect(() => {
        axios.get('http://localhost:8800/persons')
        .then(response => {
            setData(response.data)
            console.log(data)
        })
    .catch(() => {
        //Hantera errors
    });
    }, []);

    // Lägga till en person i databasen
    const [formData, setFormData] = useState({
        FirstName : '',
        LastName : '',
        Address : '',
        City : ''
    })

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post('http://localhost:8800/persons/submit-form', formData)
        .then(()=>{
            setSuccess(true)
        }).catch(()=>{
            // Hantera error
        })
    }

    const handleChange = (event)=>{
        setFormData({
            ...formData,
            // Kollar på egenskapens värde: name i input
            [event.target.name] : event.target.value
        })
    }
  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
                <label>First name
                    <input type="text" name="FirstName" onChange={handleChange} />
                </label>
                <br/>
                <label>Last name
                    <input type="text" name="LastName" onChange={handleChange} />
                </label>
                <br/>
                <label>Address
                    <input type="text" name="Address" onChange={handleChange} />
                </label>
                <br/>
                <label>City
                    <input type="text" name="City" onChange={handleChange} />
                </label>
                <br/>
                <button type="submit">Submit</button>
                <div>{success && <p>Form is submitted</p>}</div>
            </form>

            {data.map(item=>(
            <div key={item.id}>
                <p>{item.firstname} {item.lastname}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default App
