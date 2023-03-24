import React from "react"
import { firestore } from "./config"
import { Card, Table, Badge, CardTitle, Button, Spinner } from "reactstrap"

class AllOrders extends React.Component {
    constructor () {
        super ()
        this.state = {
            allOrders: [],
            isPageLoading: true,
            isButton: false
        }
    }
    componentDidMount () {
        firestore.collection("orders").where("servedStatus", "==", false).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState ({allOrders: temp, isPageLoading: false})
            const interval = setInterval(() => {
                window.location.reload()
            },60*1000);
            return () => clearInterval(interval);
        })
    }
    render () {
        const onServeHandler = (eachOrder) => {
            this.setState ({isButton: true})
            firestore.collection("orders").doc(`${eachOrder.orderNumber}`).update({
                servedStatus: true
            }).then(() => window.location.reload()).catch(err => console.log(err.message))
        }
        return (
            <div style={{marginTop: "10px", display:"flex", justifyContent:"center"}}>
                {this.state.isPageLoading ? <Spinner /> : 
                <Card style={{width:"max-content", padding:"10px"}}>
                    <CardTitle tag="h5">
                        ALL ORDERS
                    </CardTitle>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th>ORDER NO.</th>
                                    <th>ITEMS</th>
                                    <th>NAME</th>
                                    <th>DELIVER</th>
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
                                                        <div key={each.itemName}>
                                                            {eachItem.itemName} - {eachItem.quantity}
                                                        </div>
                                                    )
                                            })}
                                        </td>
                                        <td>
                                            {each.name}
                                        </td>
                                        <td>
                                            {!each.serveStatus ? <Button disabled={this.state.isButton} onClick={() => onServeHandler(each)} style={{margin:"10px", padding:"10px", cursor:"pointer"}} color="success">{this.state.isButton ? 'LOADING' : 'DELIVER'}</Button> : <Badge color="warning">WAITING</Badge> }
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                </Card>
                }
            </div>
        )
    }
}

export default AllOrders