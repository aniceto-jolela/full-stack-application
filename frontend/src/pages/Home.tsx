import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useEffect, useState } from 'react';
import { fetchProfile, fetchUsers } from '../api/authApi';
import { UserProps } from '../types/types';
import { Avatar, Grid2, Paper, styled, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { deepPurple } from '@mui/material/colors';
import { mdiAccountTie } from '@mdi/js';


const otherProps: Partial<PieChartProps> = {
  width: 400,
  height: 200,
  sx: {
    [`.${legendClasses.root}`]: {
      transform: 'translate(20px, 0)',
    },
  },
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(7),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

  


const Home = () => {
  const [users, setUsers] = useState<UserProps[]>([])
  const [error, setError] = useState<string | null>(null)
  const [totalActive, setTotalActive] = useState(0)
  const [totalStaff, setTotalStaff] = useState(0)
  const [totalSuper, setTotalSuper] = useState(0)
  const [totalElimineted, setTotalElimineted] = useState(0)
  const [formData, setFormData] = useState<UserProps>({
          username: "",
          email: "",
          password: "",
          is_active: true,
          is_staff: false,
          is_superuser: false
      })


  const data = [
    { detail: 'Users', total: users.length },
    { detail: 'Active', total: totalActive },
    { detail: 'User', total: totalStaff },
    { detail: 'Super User', total: totalSuper },
    { detail: 'Elimineted', total: totalElimineted },
  ];

  useEffect(()=>{
      const getUser = async () => {
          try{
              const data = await fetchUsers()
              setUsers(data)
          }catch(error){
              setError("Failed to fetch users. Please try again.");
          }
      }
      getUser()
  }, [users])

  useEffect(()=>{

    let count_1 = 1;
    let count_2 = 1;
    let count_3 = 1;
    let count_4 = 1;
    users.map((user)=>{
      user.is_active && setTotalActive(count_1++)
      user.is_staff && setTotalStaff(count_2++)
      user.is_superuser && setTotalSuper(count_3++)
      !user.is_active && setTotalElimineted(count_4++)
    })
  })
  useEffect(()=>{
      const getMessage = async () => {
          try{
              const data = await fetchProfile()
              setFormData(data)
          }catch(error){
              setError("Failed to load profile. Please try again.")
          }
      }
      getMessage()
  }, [])
  
  return (
  <>
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[200], }} variant="circular"  >
          <Icon path={mdiAccountTie} size={1} color={"black"}/>
      </Avatar>
      <Typography variant="h6" gutterBottom>
          {formData.username}
      </Typography>
    </Stack>
    <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
      <Grid2 size={{ xs: 12,  sm: 12, md: 6 }}>
        <Item sx={{paddingLeft:0}}>
           <PieChart
            series={[
                {
                data: data.map((user) => ({
                    label: user.detail, value: user.total 
                  })),
                valueFormatter: (v) => {
                    return `( ${v.value} ).`;
                },},
            ]}
            {...otherProps}
            />
        </Item>
      </Grid2>
      <Grid2  size={{ xs: 12,  sm: 12, md: 6 }} >
        <Item sx={{paddingLeft:0}}>
        <BarChart
          sx={{'--my-custom-gradient': 'url(#GlobalGradient)',}}
          slotProps={{
            popper: {
              sx: {
                '--my-custom-gradient': 'linear-gradient(0deg, #123456, #81b2e4);',
              },},
          }}
          series={[
            {
              label: 'User',
              data: [totalStaff],
            },
            {
              label: 'Super User',
              data: [totalSuper],
              color: 'var(--my-custom-gradient, #123456)',
            },
          ]}
          width={400}
          height={200}
        >
        <linearGradient id="GlobalGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0" stopColor="#123456" />
          <stop offset="1" stopColor="#81b2e4" />
        </linearGradient>
        </BarChart>
        </Item>
      </Grid2>
    </Grid2>
    <Typography  variant="h4" textAlign={"center"} sx={{marginTop:2}} gutterBottom>
      Welcome to the Home Page
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row-reverse', md: 'row' }} spacing={{ xs: 2, sm:2, md: 6 }} sx={{textAlign: "center"}}>
      <Gauge width={100} height={100} value={totalStaff} title="Users" />
      <Gauge sx={(theme)=>({[`& .${gaugeClasses.valueArc}`]:{fill: '#b2022b',}})} startAngle={50} endAngle={300} width={100} height={100}  value={totalElimineted} title="Elimineted" />
      <Gauge sx={(theme)=>({[`& .${gaugeClasses.valueArc}`]:{fill: '#52b202',}})} width={100} height={100} value={totalActive} valueMin={10} title="Active" valueMax={60} />
      <Gauge sx={(theme)=>({[`& .${gaugeClasses.valueArc}`]:{fill: '#8002b2',}})} width={100} height={100} value={totalSuper} valueMin={10} title="Super User" valueMax={60} />
    </Stack>

    <Typography  variant="h5" textAlign={"center"} sx={{marginTop:2, backgroundColor: "purple"}} gutterBottom>
      Full Stack Application
    </Typography>
    <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
      <Grid2 size={{ xs: 12,  sm: 12, md: 6 }}>
        <Item sx={{paddingLeft:0}}>
           Yep
        </Item>
      </Grid2>
      <Grid2  size={{ xs: 12,  sm: 12, md: 6 }} >
        <Item sx={{paddingLeft:0}}>
            Nop
        </Item>
      </Grid2>
    </Grid2>
  </>
)}

export default Home;