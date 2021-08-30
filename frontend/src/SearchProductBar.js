import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Fuse from "fuse.js";

function SearchProductBar() {
  const [{ showAllProducts, allProducts }, dispatch] = useStateValue();

  const [searchArray, setSearchArray] = useState(showAllProducts);
  const [input, setInput] = useState("");

  // const searchFromKeys = []

  const matches = [];

  useEffect(() => {
    dispatch({
      type: "SHOW_ALL_PRODUCTS",
      loading: false,
      showAllProducts: searchArray,
    });
  }, [searchArray]);

  const options = {
    keys: [
      // "createdAt",
      "_id",
      "category",
      "name",
      "description.color",
      "description.neckline",
      "description.type",
      "description.fabric",
      "description.waist_line",
      "description.lining",
    ],
    // Default threshold: 0.6,
    threshold: 0.3,
    includeMatches: true,
  };

  // CREATING A NEW FUSE INSTANCE
  const fuse = new Fuse(showAllProducts, options);

  function handleSearch(input) {
    setInput(input);
    if (!input) {
      setSearchArray(allProducts);
    } else {
      const result = fuse.search(input);

      if (!result?.length) {
        setSearchArray([]);
      } else {
        result?.forEach(({ item }) => {
          matches.push(item);
        });
        setSearchArray(matches);
      }
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="searchBar">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchProductBar;
