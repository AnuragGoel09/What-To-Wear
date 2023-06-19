import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import Switch from '@mui/material/Switch';
import { mobile} from '../responsive';
import Typewriter from 'typewriter-effect';
import dataset from './dataset.json'
import KNN from 'ml-knn';
import fecthing from './Fetch';
const Container=styled.div`
    margin-top: 20px;
`;

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const Filters=styled.div`
    display: flex;
    width:100%;
    justify-content: space-around;
    align-items: center;
    ${mobile({flexDirection:'column'})}
`;

const Button=styled.button`
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 20px;
    background-color: rgb(107,41,250);
    border: none;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        transform: scale(1.2);
    }
    ${mobile({marginTop:'5px'})}
`;

const Gender=styled.div`
    display: flex;
    align-items: center;
    color:white;
    ${mobile({marginTop:'5px'})}
`;

const Box=styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(28, 40, 80);
    min-height: 410px;
    width: 100%;;
    /* margin-left:20px; */
    margin-top:20px;
    border-radius: 20px;
`;

const Box1=styled.div`
    flex: 1;
    align-items: start;
    padding: 10px;
`;
const Line=styled.div`
    width: 100%;
    height: 100%;
    font-size: 30px;
    color:white;
    font-family: cursive;
    letter-spacing: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

const ImgContainer=styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Img=styled.img`
    /* min-height: 300px; */
    height: 400px;
    ${mobile({height:'300px'})}
    /* object-fit: cover; */
    /* max-height: 100%; */
`;
const ImgIcon=styled.img`
    height: 25px;
`;

const Icon=styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const Image=styled.div`
    background-color: black;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

const Top=styled.div`
    display: flex;
    background-color: #5858df;
    color:white;
    border-radius: 10px;
    padding: 10px 14px;
    text-align: start;
    margin: 10px;
`;

const Bottom=styled.div`
    display: flex;
    background-color: #c85959;
    color:white;
    border-radius: 10px;
    padding: 10px 14px;
    text-align: start;
    margin: 10px;
`;

const Footwear=styled.div`
    display: flex;
    background-color: #347c34;
    color:white;
    border-radius: 10px;
    padding: 10px 14px;
    text-align: start;
    margin: 10px;
`;

const Accessories=styled.div`
    display: flex;
    background-color: purple;
    color:white;
    border-radius: 10px;
    padding: 10px 14px;
    text-align: start;
    margin: 10px;
`;

const Advice=styled.div`
    display: flex;
    /* max-width: 300px; */
    background-color: black;
    color:white;
    border-radius: 10px;
    padding: 10px 14px;
    text-align: start;
    margin: 10px;
`;

export default function Clothing(props) {
    const [label,setLable]=useState(null);
    const [avatar,setAvatar]=useState("./menavatar.png")
    const [gender,setGender]=useState("men");
    const day=props.day;
    const [data,setData]=useState(null);
    const [x_data, setX] = useState([]);
    const [y_data, setY] = useState([]);
    useEffect(()=>{
        setX([]);
        setY([]);
        dataset.map((item)=>{
            setX(prevItems => [...prevItems, [item.Temp,item.Humidity]]);
            setY(prevItems => [...prevItems, [item.Class]]);
        })
   },[])
    const fetchData=async()=>{
        try {
           let fecthedData=fecthing({
                gender:gender,
                label:label,
                day:day,
                main:props.main,
            });
            setData(fecthedData);
        } catch (error) {
            console.log(error)
        }
    }
    function transposeArray(array) {
        const rows = array.length;
        const cols = array[0].length;
      
        const transposedArray = [];
      
        for (let j = 0; j < cols; j++) {
          const newRow = [];
          for (let i = 0; i < rows; i++) {
            newRow.push(array[i][j]);
          }
          transposedArray.push(newRow);
        }
      
        return transposedArray;
      }
    const handleClick=()=>{
        
        const getLabel= async ()=>{
            try {
                const temp=props.data.temp;
                const humidity=props.data.humidity;
                const transposed_y = transposeArray(y_data);
                const knn = new KNN(x_data, transposed_y[0]);
                const ans=knn.predict([temp,humidity]);
                console.log(ans);
                setLable(ans);
            } catch (error) {
                console.log(error)
            }
        }
        getLabel();
      
    }
    useEffect(()=>{
        if(label!==null)
                fetchData();
        if(gender==='men')
            setAvatar("./menavatar.png");
        else
            setAvatar("./womenavatar.png")        
    },[gender,label]);
  return (
    <Container>
      <Wrapper>
        <Filters>
           <Button onClick={handleClick}>What To Wear</Button>
            <Gender>Male <Switch style={{color:'rgb(107,41,250)'}} onClick={()=>gender==='men'?setGender("women"):setGender('men')}/> Female</Gender>
        </Filters>
        <Box>
            {!data && <Box1>
                <Line>
                    <p>Chase away the storm</p>
                    <p>with fashion in full form</p>
                </Line>
            </Box1>
                }  
            {data && <Box1>
                <Icon>
                    <Image> <ImgIcon width='25px' src={gender==='men'?"./tshirticon.png":"./topicon.png"}/></Image>
                    <Top>
                    <Typewriter options={{autoStart:true,delay:50,strings:data.outfit.top}}/>
                </Top>
                </Icon>
                <Icon>
                    <Image> <ImgIcon width='25px' src={gender==='men'?"./panticon.png":"./skirticon.png"}/></Image>
                    <Bottom>
                    <Typewriter options={{autoStart:true,delay:50,strings:data.outfit.bottom}}/>
                </Bottom>
                </Icon>
                <Icon>
                    <Image> <ImgIcon width='25px' src="./footwearicon.png"/></Image>
                    <Footwear>
                    <Typewriter options={{autoStart:true,delay:50,strings:data.outfit.footwear}}/>
                </Footwear>
                </Icon>
                <Icon>
                    {data.outfit.accessories.length>0 && <Image> <ImgIcon width='25px' src="./accessoriesicon.png"/></Image>}
                    {data.outfit.accessories.map((item)=>(
                        <Accessories>
                        <Typewriter options={{autoStart:true,delay:50,strings:item}}/>
                        </Accessories>
                    ))}
                    
                </Icon>
                { data.outfit.unique_suggestion && <Icon>
                    <Image> <ImgIcon width='25px' src="./accessoriesicon.png"/></Image>
                        <Advice>
                        <Typewriter options={{autoStart:true,delay:50,strings:data.outfit.unique_suggestion}}/>
                        </Advice>
                </Icon>}
                
            </Box1>}
            <ImgContainer>
                <Img src={avatar} />
            </ImgContainer>
        </Box>
        
      </Wrapper>
    </Container>
  )
}
