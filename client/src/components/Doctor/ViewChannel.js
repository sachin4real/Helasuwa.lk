import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import SingleAppointment from '../SingleAppointment';
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

const ViewChannel = (props) => {

    let {cid} = useParams() ;
    const [channel, setChannel] = useState([]) ;
    const [apts , setApts] = useState([]) ;


    const getChannel = async ()=> {
        axios
        .get(`http://localhost:8070/channel/get/${cid}`)
        .then((res) => {
          setChannel(res.data.Channel);
          

          
          console.log(res.data.Channel)
        })
        .catch((err) => {
          alert(err.message);
        }); 
        
    }

    const getApts = async () => {
        axios.get(`http://localhost:8070/appointment/channelAppointments/${cid}`)
          .then( (res) => {
            console.log(res.data.data);
            setApts(res.data.data);
            //const buffer = res.arrayBuffer();
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    useEffect(()=>{
        getChannel() ;
        getApts() ;
    },[])
  return (
    <div>
      <DoctorHeader />

      <div className='main-container'> 
      <DoctorSidePanel/>

        <div className='content-container'>

          <div className='channel-details'>

          <h2>Channel Details</h2>
          <h3>ID : {channel._id}</h3>
          <h3>Dr Name : {channel.drName}</h3>

          <h3>{new Date(channel.startDateTime).toString()}</h3> <br /> <br />
          </div>

        {apts.map((apt,index)=>(
            
                <SingleAppointment apt={apt}/>
           
        ))}

        </div>
      
      </div>
        
    </div>
  )
}

export default ViewChannel