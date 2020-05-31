import React from "react";
import clsx from "clsx";
import "./navbar.css";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    }
});

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: true,
            about: false,
            contact: false,
            drawer: false
        }
    }

    handleClick(tab) {
        this.props.handleClick(tab);

        if (tab === "projects") {
            this.setState({
                projects: true,
                about: false,
                contact: false
            })
        } else if (tab === "about") {
            this.setState({
                projects: false,
                about: true,
                contact: false 
            })
        } else {
            this.setState({
                projects: false,
                about: false, 
                contact: true
            })
        }
    }

    handleDrawerOpen() {
        this.setState({
            drawer: true
        })
    }

    handleDrawerClose() {
        this.setState({
            drawer: false 
        })
    }

    render() {
        const { classes } = this.props;

        let text;
        if (this.state.projects === true) {
            text = "My Projects";
        } else if (this.state.about === true) {
            text = "About Me";
        } else {
            text = "Contact Me";
        }

        return (
            <div className={classes.root}>
                <AppBar
                    color="inherit"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.drawer
                    })}>
                    <Toolbar>
                        <IconButton
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.drawer
                            })}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.handleDrawerOpen()}
                            edge="start">
                                <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {text}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.drawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => this.handleDrawerClose()}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {["projects", "about", "contact"].map((tabs, index) => (
                            <ListItem button key={tabs} onClick={() => this.handleClick(tabs)}>
                                <ListItemText primary={tabs.charAt(0).toUpperCase() + tabs.slice(1)}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(useStyles)(NavBar)