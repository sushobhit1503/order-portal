import React from "react"
import { firestore } from "./config"
import { Card, Table, Badge, CardTitle } from "reactstrap"

class AllOrders extends React.Component {
    constructor () {
        super ()
        this.state = {
            allOrders: []
        }
    }
    componentDidMount () {
        firestore.collection("orders").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState ({allOrders: temp})
        })
    }
    render () {
        return (
            <div style={{marginTop: "10px", display:"flex", justifyContent:"center"}}>
                <Card style={{width:"max-content", padding:"10px"}}>
                    <CardTitle tag="h5">
                        ALL ORDERS
                    </CardTitle>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th>ORDER NO.</th>
                                    <th>NAME</th>
                                    <th>PREP STATUS</th>
                                    <th>SERVE STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.allOrders.map((each) =>{
                                return (
                                    <tr key={each.itemName}>
                                        <td>
                                            {each.orderNumber}
                                        </td>
                                        <td>
                                            {each.order.map(eachItem => {
                                                if (eachItem.quantity)
                                                    return (
                                                        <div>
                                                            {eachItem.itemName} - {eachItem.quantity}
                                                        </div>
                                                    )
                                            })}
                                        </td>
                                        <td>
                                            {each.prepStatus ? <Badge color="success">PREPARED</Badge> : <Badge color="warning">WAITING</Badge> }
                                        </td>
                                        <td>
                                            {each.serveStatus ? <Badge color="success">DELIVERED</Badge> : <Badge color="warning">WAITING</Badge> }
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                </Card>
            </div>
        )
    }
}

export default AllOrders