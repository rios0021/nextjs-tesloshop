import  NextLink from "next/link";
import {AppBar, Button, IconButton, Box, Link, Toolbar, Typography, Badge, Input, InputAdornment} from '@mui/material'
import ClearOutlined from "@mui/icons-material/ClearOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UiContext } from "../../context/ui";
import { CartContext } from "../../context/cart";


export const Navbar = () => {
    const router  = useRouter()
    const {toggleSideMenu} = useContext(UiContext)
    const {numberOfItems} = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearch = () => {
        if(searchTerm.trim().length ===0) return;
        router.push(`/search/${searchTerm}`);
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href={'/'} passHref>
                    <Link display={'flex'} alignItems='center'>
                        <Typography variant="h6">Teslo |</Typography>
                        <Typography sx={{ml:0.5}}>Shop</Typography>
                    </Link>
                </NextLink>
                <Box flex={1}/>
                <Box sx={{display: isSearchVisible ? 'none' : {xs:'none', sm:'block'} }} className='fadeIn'>
                    <NextLink href={'/category/men'} passHref>
                        <Link>
                            <Button className={router.pathname.split("/").pop() === 'men' ? 'active' : ''}>
                                Men
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link>
                            <Button className={router.pathname.split("/").pop() === 'women' ? 'active' : ''}>
                                Women
                            </Button> 
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kids'} passHref>
                        <Link>
                            <Button className={router.pathname.split("/").pop() === 'kids' ? 'active' : ''}>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1}/>
                {/* Desktop */}
                {
                    isSearchVisible
                        ?(
                            <Input
                                sx={{display:{xs:'none', sm:'flex'} }}
                                className="fadeIn"
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type='text'
                                onKeyDown={(e) => e.key === 'Enter' ? onSearch() : null}
                                placeholder="Search..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                />
                        )
                        :(
                            <IconButton
                                className="fadeIn"
                                onClick={() => setIsSearchVisible(true)}
                                sx={{display:{xs:'none', sm:'flex'} }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }
                {/* Mobile */}
                <IconButton sx={{display: {xs: 'flex', sm: 'none'}}} onClick={toggleSideMenu}>
                    <SearchOutlined />
                </IconButton>
                <NextLink href={'/cart'} passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems < 10 ? numberOfItems : '+9'} color='secondary'>
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toggleSideMenu}>Menu</Button>
            </Toolbar>
        </AppBar>
    )
}