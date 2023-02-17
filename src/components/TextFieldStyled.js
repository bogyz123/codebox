import { TextField } from "@mui/material"

// Fix every console error.
// Fix textarea text disappear.
// handle upload

export default function TextFieldStyled({ children, ref , size, label, labelColor, ff, w,h, onChange, fullWidth,multiline, type }) {
    return (
        <TextField type={type} inputRef={ref} fullWidth={fullWidth} multiline={multiline} onChange={onChange} sx={{width: w, height:h}} inputProps={{ style: {  color: '#fff', fontFamily: ff } }} InputLabelProps={{ style: { color: labelColor, fontFamily: ff } }} size={size} label={label}>
            {children}
        </TextField>
    )
}
