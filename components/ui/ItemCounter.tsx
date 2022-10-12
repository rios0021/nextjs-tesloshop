import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import  RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline"
import { Box, IconButton, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
    currentValue: number;
    maxValue: number;
    updateQuantity: (newValue: number) => void;
}


export const ItemCounter:FC<Props> = ({currentValue, maxValue, updateQuantity}) => {

    const onValueChange = (change:number) =>{
        const newValue = currentValue+change;
        if(newValue > 0 && newValue <= maxValue){
            updateQuantity(newValue)
        }
    }
    return (
        <Box display={'flex'} alignItems='center'>
            <IconButton onClick={() => onValueChange(-1)}>
                <RemoveCircleOutline/>
            </IconButton>
            <Typography sx={{width:40 , textAlign: 'center'}}>{currentValue}</Typography>
            <IconButton onClick={() => onValueChange(+1)}>
                <AddCircleOutline/>
            </IconButton>
        </Box>
    )
}