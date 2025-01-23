import { Avatar, Grid2, Paper, Stack, styled, Typography } from "@mui/material"
import Icon from '@mdi/react';
import { red } from '@mui/material/colors';
import { mdiAccountTie, mdiSecurity } from '@mdi/js';
import { Link } from "react-router-dom";



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
                        <Typography variant="subtitle2" component={"code"} color="error">The token time is 20 minutes, it should be 5 minutes, but as I'm not using the refresh token, I had to increase the minutes for the user to have a good experience.</Typography>
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
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2}}>
                    <Typography variant='h6' color='info'>
                    Validate password
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
            </Grid2>
            <Grid2 size={{ xs: 12,  sm: 12, md: 6 }} >
                <Item sx={{paddingLeft:0, paddingTop:2, marginBottom:2}}>
                    <Typography variant='h6' color='info'>
                    DATABASES
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: "left", paddingLeft:2, paddingTop:2,}} component={"p"}>
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
                </Item>
                <Link  to={"/dausers"} >Delete All users</Link>
            </Grid2>
        </Grid2>
    </>
)}

export default Security