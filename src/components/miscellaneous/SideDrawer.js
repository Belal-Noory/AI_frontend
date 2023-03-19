import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { UserState } from "../../Context/UserProvider";

function SideDrawer() {
  const {
    user,
    notification,
  } = UserState();

  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };

  return (
    <>
      <Box
        style={{display:"flex",justifyContent:"space-between",alignItems:"center","position":'fixed',top:'0',left:'0',right:'0', zIndex:'1000'}}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
      >
        <Text fontSize="2xl" fontFamily="Work sans" style={{marginLeft:'8px'}}>
          {user.name}
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {}}
                  borderRadius="5px"
                  maxWidth="250px"
                >
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    {notif.text}
                    {notif.buy? <Button style={{background:'dodgerblue',border:'none',outline:'none',color:'white',marginTop:'8px'}} onClick={()=>window.location = "http://www.afghanai.tech"}>Buy</Button>:''}
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
