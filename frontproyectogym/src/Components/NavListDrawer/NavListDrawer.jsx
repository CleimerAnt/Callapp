import { Modal,Box, Button, List, ListItem, ListItemButton, Avatar, ListItemAvatar } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import fuegoCalorico from '../../assets/fuegoCalorico.png';

export default function NavListDrawer({navLinks = []}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <div>
            <Button variant="contained" color="primary" onClick={handleOpen}><MenuIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List disablePadding sx={{display : 'flex', alignItems : 'center', justifyContent : 'center', flexDirection : 'column'}}>
                    <Avatar sx={{width : '65px', mb:2, height : '70px'}} alt="Fuego Calorico" src={fuegoCalorico}/>
                    {navLinks.map((item, key) => (
                    <ListItem key={key} disablePadding>
                        <ListItemButton key={key} sx={{fontSize : '30px'}} to={item.enlace} component={NavLink}>{item.titulo}</ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Modal>
    </div>
}