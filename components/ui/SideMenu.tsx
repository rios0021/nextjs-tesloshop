import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined"
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings"
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined"
import EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined"
import FemaleOutlined from "@mui/icons-material/FemaleOutlined"
import LoginOutlined from "@mui/icons-material/LoginOutlined"
import MaleOutlined from "@mui/icons-material/MaleOutlined"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined"
import { useRouter } from "next/router"
import { useContext, useState } from 'react';
import { UiContext } from "../../context/ui";


export const SideMenu = () => {

    const router = useRouter();
    const {sideMenuOpen, toggleSideMenu} = useContext(UiContext);
    const [searchTerm, setSearchTerm] = useState('');

    const onSearch = () => {
        if(searchTerm.trim().length ===0) return;
        console.log('searchterm')
        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url:string) => {
        toggleSideMenu();
        router.push(url);
    }

    return (
        <Drawer
            open={ sideMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem 
                        sx={{
                            display: {md:'none'}
                        }}
                    >
                        <Input
                            autoFocus={true}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            onKeyDown={(e) => e.key === 'Enter' ? onSearch() : null}
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onSearch}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'My Orders'} />
                    </ListItem>


                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' }}}  
                        className={router.pathname.split("/").pop() === 'men' ? 'active' : ''}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Men'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }} 
                        className={router.pathname.split("/").pop() === 'women' ? 'active' : ''}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Women'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }} 
                        className={router.pathname.split("/").pop() === 'kids' ? 'active' : ''}
                        onClick={() => navigateTo('/category/kids')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Kids'} />
                    </ListItem>


                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}