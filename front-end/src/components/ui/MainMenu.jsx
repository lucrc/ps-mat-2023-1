import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { Divider } from '@mui/material';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <MenuIcon />
          </IconButton>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/payment_method">Métodos de pagamento</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/channel">Canais de venda</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/carrier">Meios de entrega</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/shipment_priority">Prioridades de entrega</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/order_status">Status de pedidos</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/tag">Tags</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/user">Usuarios</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/city">Cidades</MenuItem>
        <Divider />


        <MenuItem onClick={handleClose} component={Link} to="/">Início</MenuItem>
        
      </Menu>
    </div>
  );
}