
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiInformationVariantCircleOutline, mdiBookInformationVariant } from '@mdi/js';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const PasswordTooltips = styled(({ className, ...props }: TooltipProps) => (
<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
[`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    
},
}));


export const PasswordTooltip = () =>{
    return(
        <PasswordTooltips
            title={
            <>
                <Typography color="inherit">
                    <Icon path={mdiBookInformationVariant} size={1} />
                </Typography>
                <Typography sx={{marginBottom:-2}} color="warning" variant="subtitle2" style={{fontSize:12, fontStyle: "italic" ,textEmphasisStyle: "triangle"}}  >
                    * Password must be at least 8 characters long.
                </Typography>
                <Typography sx={{marginBottom:-2}} color="warning" variant="subtitle2" style={{fontSize:12, fontStyle: "italic" }} ><br/>
                    * Password must contain at least one digit.
                </Typography>
                <Typography sx={{marginBottom:-2}} color="warning" variant="subtitle2" style={{fontSize:12, fontStyle: "italic" }} ><br/>
                    * Password must contain at least one uppercase letter.
                </Typography>
                <Typography sx={{marginBottom:-2}} color="warning" variant="subtitle2" style={{fontSize:12, fontStyle: "italic" }} ><br/>
                    * Password must contain at least one lowercase letter.
                </Typography>
                <Typography  variant="subtitle2" color="warning" style={{fontSize:12, fontStyle: "italic" }} ><br/>
                    * Password must contain at least one special character.
                </Typography>
            </>
            }>
            <Typography sx={{marginLeft:24}} variant="caption">
                <Icon path={mdiInformationVariantCircleOutline} size={1} />
            </Typography>
        </PasswordTooltips>
    )
}