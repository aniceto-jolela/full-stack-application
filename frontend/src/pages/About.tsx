import { Grid2, Paper, styled, Typography } from "@mui/material";
import Icon from '@mdi/react';
import { mdiInfinity } from '@mdi/js';


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

const About = () => {
    return (
        <>
        <Typography variant="h5" sx={{marginBottom: 2}}>
            Python 
        </Typography>
        <Typography sx={{marginBottom: 2}} variant="subtitle2">
         Is a high-level, script-interpreted, imperative, object-oriented, functional, dynamically typed, and strong programming language. It was launched by <strong>Guido van Rossum</strong> in 1991. It currently has a community development model, open and managed by the non-profit organization <a href="https://www.python.org/about/gettingstarted/" target="_blank">Python</a> Software Foundation.
        </Typography>
        <Typography variant="h5" sx={{marginBottom: 2}}>
            Django-Rest-Framework
        </Typography>
        <Typography sx={{marginBottom: 2}} variant="subtitle2">
            Django REST framework is a powerful and flexible toolkit for building Web APIs.<br/>
            Some reasons you might want to use <a href="https://www.django-rest-framework.org/" target="_blank">REST framework:</a><br/>
            The Web browsable API is a huge usability win for your developers.<br/>
            Authentication policies including packages for OAuth1a and OAuth2. <br/>
            Serialization that supports both ORM and non-ORM data sources. <br/>
            Customizable all the way down - just use regular function-based views if you don't need the more powerful features.<br/>
            Extensive documentation, and great community support. <br/>
            Used and trusted by internationally recognised companies including Mozilla, Red Hat, Heroku, and Eventbrite.<br/>
        </Typography>
        <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }} >
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
            <Item sx={{paddingLeft:0, paddingTop:2}}>
                <Typography variant='h6' color='success'>
                psycopg
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2}} component={"p"}>
                <a href="https://www.psycopg.org/" target="_blank">Psycopg</a> is the most popular PostgreSQL adapter for the Python programming language. Its core is a complete implementation of the Python DB API 2.0 specifications. Several extensions allow access to many of the features offered by <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>.
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                CORS
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                    django-cors-headers is a Django application for handling the server headers required for Cross-Origin Resource Sharing (<a href="https://pypi.org/project/django-cors-headers/" target="_blank">CORS</a>).
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                Node
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                <a href="https://nodejs.org/en" target="_blank">Node</a>.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 12, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                Pictogrammers <br/>
                <Icon path={mdiInfinity} size={1} style={{marginTop:10}} spin />
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                Open-source <a href="https://pictogrammers.com/" target="_blank">iconography</a> for designers and developers.
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                Vite + React
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                <a href="https://vite.dev/guide/" target="_blank">Vite</a> is a build tool that aims to provide a faster and leaner development experience for modern web projects. 
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                Material UI 
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                <a href="https://mui.com/" target="_blank">MUI</a>  offers a comprehensive suite of free UI tools to help you ship new features faster. 
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2}}>
                <Typography variant='h6' color='primary'>
                Fly.io
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                The most flexible and powerful compute platform on any public cloud. <a href="https://fly.io/" target="_blank">Fly</a> Machines are hardware-virtualized containers, running on our own hardware, that launch instantly and run exactly as long as you want them to — for a single HTTP request, or for weeks of uptime. 
                
                </Typography>
            </Item>
            </Grid2>
            <Grid2  size={{ xs: 12,  sm: 6, md: 6 }} >
            <Item sx={{paddingLeft:0,  paddingTop:2, paddingBottom:10}}>
                <Typography variant='h6' color='primary'>
                Neon
                </Typography>
                <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, marginBottom:2}} component={"p"}>
                <a href="https://neon.tech/home" target="_blank">Neon</a> offers a serverless Postgres database platform for developers. Instantly branch your data and schema to access isolated DB copies. Generous Free Tier. Scale to Zero DBs. Instant Autoscaling.
                 
                </Typography>
            </Item>
            </Grid2>
        </Grid2>
        </>
    )
}

export default About;