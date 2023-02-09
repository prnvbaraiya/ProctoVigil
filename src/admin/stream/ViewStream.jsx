import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import { zegoInstance } from "../../config/ZegoConfig";

function ViewStream() {
  const location = useLocation();
  const data = location.state;
  const zconf = {
    roomId: "345",
    token: `04AAAAAGPmM80AEDlhcGJmc3B1MWVnOXg2eDgAoDy5u6mPNYLv0Tv9mtGaelg/SdXJ1E3Do5jo0EkGQJLCMGxHomibJ+tKuIddEkA2vG9lCyw/f3sdOF57EwMabir284YcQzcKwJv35NpeKgw5T1VQFgxx2Ej03OY0m/I3AphVosLkuTZM50wcYDtGSES/FRPhezQTWtsqynHRZLGoNQvHvlTUOmmOwAAHeOmylhT/gUhGayMmxt4LbpATos4=`,
    userId: "user2",
    userName: "user2",
  };

  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    try {
      await instance.loginRoom(zconf.roomId, zconf.token, {
        userID: zconf.userId,
        userName: zconf.userName,
      });
    } catch (err) {
      console.log("Create Room Err: ", err);
    }

    instance.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        if (updateType === "ADD") {
          const streamID = streamList[0].streamID;
          const remoteStream = await instance.startPlayingStream(streamID);

          const remoteView = instance.createRemoteStreamView(remoteStream);
          remoteView.play("remote-stream", { enableAutoplayDialog: true });
        } else if (updateType === "DELETE") {
          const streamID = streamList[0].streamID;
          instance.stopPlayingStream(streamID);
        }
      }
    );
  };

  return (
    <AdminLayout>
      <Box align="center">
        <Typography variant="h3">View {data.student}</Typography>
        <div style={{ width: "60vw", height: "60vh" }} id="remote-stream"></div>
      </Box>
    </AdminLayout>
  );
}

export default ViewStream;
