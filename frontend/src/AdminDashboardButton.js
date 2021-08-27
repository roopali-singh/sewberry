import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BallotIcon from "@material-ui/icons/Ballot";
import BurstModeIcon from "@material-ui/icons/BurstMode";

function AdminDashboardButton() {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  ////////////////////////// STYLES //////////////////////////////////

  const useStyles = makeStyles((theme) => ({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
      //   position: "relative",
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },

    speedDial: {
      position: "absolute",
      ///
      bottom: 0,
      right: 0,
      zIndex: 10,
      borderRadius: "50%",
      padding: 0,
      margin: 0,
      fontSize: "0.3125rem",
      ///
      "&.MuiSpeedDial-directionUp": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();
  ///////////////////////////////////////////////////////////////////

  const actions = [
    { icon: <BurstModeIcon />, name: "Products", link: "products" },
    { icon: <BallotIcon />, name: "Orders", link: "orders" },
  ];

  function adminActionButton(link) {
    history.push(`/admin?details=${link}`);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        // hidden={hidden}
        icon={<DashboardIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => adminActionButton(action.link)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default AdminDashboardButton;
