import React from 'react'
import styled from 'styled-components';
import { tablet,mobile } from '../responsive';

const Container=styled.div`
    width: 100%;
    height: 100%;
`;

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
`;

const Icon=styled.div`
    position: absolute;
    top: 0;
    left: 10px;
    ${tablet({left:'70px'})};
    ${mobile({left:'-40px'})}
`;

const Box1=styled.div`
    position: absolute;
    top:35px;
    right: 40px;
    ${tablet({right:'100px'})}
    ${mobile({right:'-20px'})}
`;

const Temp=styled.div`
    color:white;
    font-size: 40px;
`;

const Location=styled.div`
    color:gray;
    font-size: 20px;
`;

const Box2=styled.div`
    background-color: rgb(28, 40, 80);
    height: 80%;
    width: 75%;
    ${mobile({width:'80vw'})}
    border-radius:15px;
    margin-top: 50px;
`;

const Atmosphere=styled.div`
    color:white;
    margin-top: 25px;
    ${mobile({marginTop:'60px'})}
    font-size: 30px;
    letter-spacing: 1.5px;
`;

const Desc=styled.div`
    color:lightgray;
    font-size: 15px;
    margin-top: 2px;
`;

const Box3=styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: space-around;
    letter-spacing: 1.5px;
`;

const FeelsLike=styled.div`
`;

const MinMax=styled.div`
    
`;

const Title=styled.div`
    color:white;
    font-size: 16px;
    margin-bottom: 2px;
`;

const Val=styled.div`
    color:lightgray;
    font-size: 14px;
`;

const Map=styled.div`
    margin-top: 30px;
`;
const Iframe=styled.iframe`
    width: 90%;
    ${tablet({width:'70%'})}
    height: 200px;
    ${tablet({height:'300px'})}
    border-radius: 20px;
    ${mobile({height:'200px'})}
    ${mobile({marginBottom:'20px'})}
`;

export default function CurrentWeather(props) {
    let currentData=props.data;
    return (
    <Container>
        <Wrapper>
            <Icon><img  height='170px' src={`http://openweathermap.org/img/w/${currentData.weather[0].icon}.png`} alt="" /></Icon>
            <Box1>
                <Temp>{Math.round(currentData.main.temp - 273.15)}&deg;C</Temp>
                <Location>{currentData.name}, {currentData.sys.country}</Location>
            </Box1>
            <Box2>  
                <Atmosphere>{currentData.weather[0].main}</Atmosphere>
                <Desc>{currentData.weather[0].description}</Desc>
                <Box3>    
                    <FeelsLike>
                        <Title>Feels Like</Title>
                        <Val>{Math.round(currentData.main.feels_like - 273.15)}&deg;C</Val>
                    </FeelsLike>
                    <MinMax>
                        <Title>Min/Max</Title>
                        <Val>{Math.round(currentData.main.temp_max - 273.15)}/{Math.round(currentData.main.temp_min - 273.15)} &deg;C</Val>
                    </MinMax>
                </Box3>
                <Box3>    
                    <FeelsLike>
                        <Title>Humidity</Title>
                        <Val>{currentData.main.humidity}%</Val>
                    </FeelsLike>
                    <MinMax>
                        <Title>Wind</Title>
                        <Val>{currentData.wind.speed} m/s</Val>
                    </MinMax>
                </Box3>
                
            <Map>
                <Iframe src={`https://maps.google.com/maps?q=${currentData.coord.lat},${currentData.coord.lon}&hl=en&z=14&output=embed`} frameborder="0"></Iframe>
            </Map>
            </Box2>
        </Wrapper>
    </Container>
  )
}
