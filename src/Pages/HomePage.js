import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history("/chats");
  }, [history]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{maxHeight: '100vh', overflow:'hidden'}}>
      <div className="col-span-2 hidden md:inline">
        <img src="assets/bg.jpg" alt="bg" />
      </div>
      <div>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          m="40px 0 15px 0"
          className="justify-self-start"
        >
          <Text fontSize="4xl" className="text-center">
            AFGHAN AI
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </div>
  );
}

export default Homepage;