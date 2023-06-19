import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CurrentWeather from '../components/CurrentWeather';
import Clothing from '../components/Clothing';
import axios from 'axios';
import {data} from './tempData';
import { tablet } from '../responsive';
import { mobile } from '../responsive';

const Container=styled.div`
width: 100vw;
height: 100vh;
/* ${mobile({width:'90vw'})} */
${tablet({height:'fit-content'})}
${tablet({padding:'50px 0px'})}
display: flex;
align-items: center;
justify-content: center;
    background-color: rgb(48,35,103);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper=styled.div`
width: 80vw;
min-height: 80vh;
padding: 30px;
background-color: rgb(12,21,66);
border-radius: 30px;
display: flex;
${tablet({flexDirection: 'column'})};

`;

const Part1=styled.div`
    flex: 2;
    ${tablet({flex:1})};
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const Box1=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Greet=styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
const Line1=styled.div`
    color: white;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
    margin-bottom: 3px;

`;

const Line2=styled.div`
    color:gray;

`;

const CurrentTime=styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const Time=styled.div`
    color: rgba(255,255,255,0.8);
    font-size: 40px;
    letter-spacing: 1px;
`;

const Date=styled.div`
    color:gray;
    font-size: 10px;
    letter-spacing: 1px;
`;

const Part2=styled.div`
    flex: 1;
    padding: 5px;
    display: flex;
    flex-direction: column;
`;
export default function Home() {
    const [lat,setLat]=useState(null);
    const [lon,setLon]=useState(null);
    const [currentData,setCurrentData]=useState(data);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((postion)=>{
                setLat(postion.coords.latitude)
                setLon(postion.coords.longitude)
                console.log(postion)
            })
            console.log(lat,lon);
            
    },[lat,lon]);
    useEffect(()=>{
        const run=async()=>{
            try {
                console.log(lat)
                console.log("hi")
                if(lat!=null){
                    const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=92fe95ee079e7f6e08a913ca378d87f7`)
                    setCurrentData(res.data);
                console.log(res.data);
            }
        } catch (error) {
                console.log(error);
            }
        }
        
        run();
        
    },[lat,lon]);

    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    const [day,setDay]=useState('day');
    let [date,setDate]=useState(new window.Date());
    const [greet,setGreet]=useState(["Good morning,","Have a cup of tea"]); 
    // console.log(day)
    useEffect(()=>{
        var timer=setInterval(()=>setDate(new window.Date()),1000);
        if(date.getHours()>=5 && date.getHours()<12){
             setGreet(["Good morning,","Have a cup of tea"]);   
             setDay('day');
        }
        else if(date.getHours()>=12 && date.getHours()<17){
            setGreet(["Good afternoon,","Have a nice day"]);   
            setDay('day');
        }
        else{
            setGreet(["Good evening,","Have a good sleep"]);   
            setDay('night');
        }
        return function cleaup(){
            clearInterval(timer);
        }
    },[date]);

  return (
    <Container>
      <Wrapper>
        <Part1>
            <Box1>
                <Greet>
                    <Line1>{greet[0]}</Line1>
                    <Line2>{greet[1]}</Line2>
                </Greet>
                <CurrentTime>
                    <Time>{date.getHours()}:{date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}</Time>
                    <Date>{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Date>
                </CurrentTime>
            </Box1>
        <Clothing data={{temp:Math.round(currentData.main.feels_like - 273.15),humidity:currentData.main.humidity}} day={day} main={currentData.weather[0].main}/>
        </Part1>
        
        <Part2>
            <CurrentWeather data={currentData}/>
        </Part2>
      </Wrapper>
    </Container>
  )
}
