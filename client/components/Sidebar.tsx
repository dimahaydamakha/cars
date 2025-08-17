import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import {mapPageToURL} from "../utils/utils.ts"
import { grey } from '@mui/material/colors';
import { ListItemIcon } from '@mui/material';

export default function SideBar() {

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Home', 'Find Car'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={mapPageToURL(text)}>
              <ListItemIcon>
                {text == "Home" ? <HomeIcon /> : <DirectionsCarFilledIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer variant='permanent' hideBackdrop={true} elevation={0} slotProps={{paper:{sx:{borderRight:1, borderColor:grey[200]}} }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
