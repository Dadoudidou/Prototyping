import * as React from "react"
import { Toolbar, AppBar, Typography, Button, IconButton, Hidden, Drawer } from "@material-ui/core"

import AccountIcon from "../../Headers/AccountIcon";
import SearchIcon from "../../Headers/SearchIcon";
import { Link } from "react-router-dom";
import Breakpoint from "../../../System/Framer/Responsive/Breakpoint";
import { Menu as MenuIcon } from "@material-ui/icons"
import SearchMode from "./SearchMode";
import Sidebar from "./Sidebar";

type props = {
    title?: string
}
type state = {
    searchMode: boolean
    openSidebar: boolean
}

export default class extends React.PureComponent<props, state>{
    state = { searchMode: false, openSidebar: false }
    render(){
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        {/* SEARCH MODE */}
                        {this.state.searchMode && 
                            <div style={{flexGrow:1}}>
                                <SearchMode onClose={() => this.setState({ searchMode: false })} />
                            </div>
                        }
                        {/* NORMAL MODE */}
                        {!this.state.searchMode &&
                            <>
                                <Breakpoint breakpoint="xs">
                                    <IconButton color="inherit" onClick={() => this.setState({...this.state, openSidebar:true})}><MenuIcon /></IconButton>
                                </Breakpoint>
                                <Breakpoint breakpoint="sm" up >
                                    <Button color="inherit"><Link to="/InscriptionExpress/Etape1">Inscription Express</Link></Button>
                                    <Button color="inherit">Adhérents</Button>
                                    <Button color="inherit">Campagnes</Button>
                                </Breakpoint>
                                <div style={{flexGrow:1}}></div>
                            </>
                        }
                        {!this.state.searchMode && <SearchIcon onClick={() => this.setState({ searchMode: true })} />}
                        <AccountIcon  />
                    </Toolbar>
                </AppBar>
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        open={this.state.openSidebar}
                        onClose={() => this.setState({ ...this.state, openSidebar: false })}
                        ModalProps={{ keepMounted: true }}
                    >
                        <Sidebar />
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}