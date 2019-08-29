import React, { Component } from 'react'
import { Drawer, Button, Divider } from '@material-ui/core'


export class LeftDrawer extends Component {
    render() {
        return (
            <div>
                <Button>Open Left</Button>
                <Drawer open={false}>
                    <div style={{ width: 200 }}>
                        <h2>notes</h2>
                    </div>
                    <div style={{ width: 200 }}>
                        <h2>labels</h2>
                    </div>
                    <Divider />
                    <div style={{ width: 200 }}>
                        <h2>reminders</h2>
                    </div>
                    <Divider />
                    <div style={{ width: 200 }}>
                        <h2>trash</h2>
                    </div>
                    <Divider />

                </Drawer>
            </div>
        )
    }
}

export default LeftDrawer
