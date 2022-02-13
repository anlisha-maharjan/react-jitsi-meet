import React from "react";
import * as Mui from "@mui/material";

const Jitsi = ({ uuid }) => {
  const containerId = "react-jitsi-meet-container";
  const [jitsiObj, setJitsiObj] = React.useState({});

  const loadScript = () => {
    let resolveloadScriptPromise = null;

    const loadScriptPromise = new Promise((resolve) => {
      resolveloadScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolveloadScriptPromise;
    document.body.appendChild(script);

    return loadScriptPromise;
  };

  const initialise = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: uuid,
      userInfo: {
        email: "kidin88118@alfaceti.com",
        displayName: "John",
      },
      parentNode: document.getElementById(containerId),
      interfaceConfigOverwrite: {
        APP_NAME: "ReactJitsiMeet",
        AUDIO_LEVEL_PRIMARY_COLOR: "rgba(91,202,221,0.4)",
        AUDIO_LEVEL_SECONDARY_COLOR: "rgba(91,202,221,0.2)",
        DEFAULT_BACKGROUND: "#004e70",
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        MOBILE_APP_PROMO: false,
        PROVIDER_NAME: "ReactJitsiMeet",
      },
    });

    _jitsi.addEventListener("videoConferenceLeft", (info) => {
      _jitsi.dispose();
    });

    setJitsiObj(_jitsi);
  };

  React.useEffect(() => {
    initialise();
    return () => jitsiObj?.dispose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={"jitsi-room"}>
      <Mui.AppBar className="jitsi-room__head" position="static" elevation={0}>
        <Mui.Toolbar>
          <Mui.Typography className="jitsi-room__head__title">
            React Jitsi Meet
          </Mui.Typography>
        </Mui.Toolbar>
      </Mui.AppBar>
      <Mui.Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex="1"
      >
        <div id={containerId} className={`confrence`}></div>
      </Mui.Box>
    </main>
  );
};
export default Jitsi;
