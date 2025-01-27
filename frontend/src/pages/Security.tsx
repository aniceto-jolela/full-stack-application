import { Grid2, Paper, styled, Typography } from "@mui/material"
import { green, orange, red } from '@mui/material/colors';
import { mdiSecurity } from '@mdi/js';
import { Link } from "react-router-dom";
import { fetchProfile } from "../api/authApi";
import { useEffect, useState } from "react";
import { UserProps } from "../types/types";
import Icon from '@mdi/react';
import { mdiAlertOctagonOutline } from '@mdi/js';


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

const Security = () => {
    //const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<UserProps>({
            username: "",
            email: "",
            password: "",
            is_active: true,
            is_staff: false,
            is_superuser: false
        })
    

    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchProfile()
                setFormData(data)
            }catch(error){
                //setError("Failed to load profile. Please try again.")
            }
        }
        getMessage()
    }, [])


    return(
    <>
         <Typography variant="h5" color='#fff' borderRadius={5} width={140} sx={{marginTop:2, marginBottom: 5 ,backgroundColor: "purple"}} gutterBottom>
            <Icon path={mdiSecurity} size={1} style={{marginLeft:7, marginBottom:-2}}  />
              Security
        </Typography>
        <Typography variant="subtitle2">
        I was supposed to filter certain access fields, but I didn't do so for better understanding and feedback on access validations.
        <br/>
        This application uses 2 types of authentication:
        </Typography>
        <Typography component={"ol"} sx={{marginBottom:2}}>
            <Typography component={"li"} >
                username / password
            </Typography>
            <Typography component={"li"} >
                token
            </Typography>
        </Typography>
        <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }} >
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2, bgcolor: red[100]}}>
                    <Typography variant='h6' >
                    Authentication
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2}} component={"p"}>
                        <Typography component={"code"} color="warning">.username / password</Typography> <br/>
                        I used it to restrict access on the frontend side <br/><br/>
                        <Typography component={"code"} color="warning">.Token </Typography><br/>
                        I used it to restrict the backend (API) side.<br/>
                        <Typography variant="subtitle2" component={"code"} color="error">The token time is 5 minutes, for better API security. I'm not using the refresh token, because I didn't think it was necessary.</Typography>
                    </Typography>
                </Item>
            </Grid2>
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2}}>
                    <Typography variant='h6' color='info'>
                    API view (decorator)
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2}} component={"p"}>
                        This code snippet is a decorator, <br/>
                        is used to request handling, authentication, and permissions.<br/>
                        other method (["POST"], ["PUT"], ["DELETE"])<br/><br/>
                        <Typography component={"code"} color="warning">
                            @api_view(["GET"])
                            @authentication_classes([JWTAuthentication, SessionAuthentication])
                            @permission_classes([IsAuthenticated])
                        </Typography> <br/>
                    </Typography>
                </Item>
            </Grid2>
            <Grid2 size={{ xs: 12,  sm: 12, md: 12 }} >
                <Item sx={{paddingLeft:0, paddingTop:2}}>
                    <Typography variant='h6' color='info'>
                    <Icon path={mdiAlertOctagonOutline} size={1} color={orange[500]} style={{marginBottom:-5}} spin /> Login
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2}} component={"p"}>
                        By default, a username and password are automatically created. <br/>
                        This user cannot be managed or deleted by any user. <br/>
                        Its objective is to make the crud complete and guarantee access to the system. <br/>
                        Only he is capable of permanently deleting all users. <br/>
                        The username and password are conventional, to make the application easier to use.<br/><br/>
                        <Typography component={"code"} color="warning">
                            username : admin <br/>
                            password : Admin123#
                        </Typography> <br/>
                    </Typography>
                </Item>
            </Grid2>
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2, marginBottom:2}}>
                    <Typography variant='h6' color='info'>
                        Validate password <br/>
                        (Python)
                    </Typography>
                    <Typography variant="subtitle2" sx={{textAlign: "left", paddingLeft:2, paddingTop:2}}>
                        def validate_password(self, value): <br/>
                            if len(value) {"<"} 8: <br/>
                                raise serializers.ValidationError("...") <br/>
                            if not re.search(r"\d", value): <br/>
                                raise serializers.ValidationError("...") <br/>
                            if not re.search(r"[A-Z]", value): <br/>
                                raise serializers.ValidationError("...") <br/>
                            if not re.search(r"[a-z]", value): <br/>
                                raise serializers.ValidationError("...") <br/>
                            if not re.search(r'[!@=;«»+ºª#$%^&*{"<>"}(),._~{}|?":]', value): <br/>
                                raise serializers.ValidationError("...") <br/>
                            return value
                    </Typography>
                </Item>
                <Typography variant="subtitle2">If you are interested in studying or taking advantage of this project, you can clone it, it is available on <a href="https://github.com/aniceto-jolela/full-stack-application" target="_blank">github</a> [ <a href="https://github.com/aniceto-jolela/full-stack-application/tree/main/frontend" target="_blank">frontend</a> and <a href="https://github.com/aniceto-jolela/full-stack-application/tree/main/backend" target="_blank">backend</a> ]. </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2, marginBottom:2}}>
                    <Typography variant='h6' color='info'>
                    DATABASES
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, paddingBottom:2}} component={"p"}>
                        "default": {"{"}
                            "ENGINE": os.environ.get("ENGINE_DB"),
                            "USER": os.environ.get("USER_DB"),
                            "NAME": os.environ.get("NAME_DB"),
                            "PASSWORD": os.environ.get("PASSWORD_DB"),
                            "HOST": os.environ.get("HOST"),
                            "PORT": os.environ.get("PORT_DB"),
                            "OPTIONS": {"{"}"pool": True{"}"}
                        {"}"}
                    </Typography>
                    <Typography variant='h6' color="error">
                        Redux and Context
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2, textDecorationLine: "line-through"}} component={"p"}>
                        I didn't use Redux or Context because this project is too small 😩. <br/>
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, color: green[400]}} component={"p"}>
                        But for other purposes, always use Context or Redux for better application performance, these are good programming practices 👍❤️😊.
                    </Typography>
                </Item>
                {formData.is_superuser && <Link  to={"/dausers"} >Delete All users</Link>}
            </Grid2>
        </Grid2>
    </>
)}

export default Security