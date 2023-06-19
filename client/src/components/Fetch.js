const Clear=require('./data/Clear');
const Clouds=require('./data/Clouds');
const Dizzle=require('./data/Dizzle');
const Rainy=require('./data/Rainy');
const Snow=require('./data/Snow');
const Thunderstorm=require('./data/Thunderstorm');
const Others=require('./data/Others');
export default function fecthing(prereq) {
    // Function implementation
    let data;
    if(prereq.main==="Clear")
        data=Clear.Clear[prereq.label];
        else if(prereq.main==="Clouds")
        data=Clouds.Clouds[prereq.label];
        else if(prereq.main==="Rain")
        data=Rainy.Rainy[prereq.label];
        else if(prereq.main==="Snow")
        data=Snow.Snow[prereq.label];
        else if(prereq.main==="Thunderstorm")
        data=Thunderstorm.Thunderstorm[prereq.label];
        else if(prereq.main==="Dizzle")
        data=Dizzle.Dizzle[prereq.label];
        else  
        data=Others.Others[prereq.label];    
        if(prereq.day==='day')
        data=data.day;
        else
        data=data.night;
    if(prereq.gender==='men')
    data=data.men;
    else
    data=data.women;    
    return data;

  }