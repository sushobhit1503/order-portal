import React from "react"
import { firestore } from "./config"
import { Card, Table, Badge, CardTitle, Button, Spinner } from "reactstrap"
import Chaat from "./Chaat"

class Burger extends React.Component {
    constructor () {
        super ()
        this.state = {
            allOrders: [],
            isPageLoading: true,
            isButton: false
        }
    }
    componentDidMount () {
        firestore.collection("orders").where("prepStatus", "==", false).get().then(Snapshot => {
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
        const updatePrepStatus = (eachOrder) => {
            let finalStatus = true
            this.setState ({isButton: true})
            eachOrder.order.map((eachItem, index) => {
                if (eachItem.prepStatus === false)
                    finalStatus = false
                if (eachItem.itemName === "Veg Burger" || eachItem.itemName === "Veg Cheese Burger")
                    eachOrder.order[index].prepStatus = true
            })
            firestore.collection("orders").doc(`${eachOrder.orderNumber}`).update ({
                order: eachOrder.order,
                prepStatus: finalStatus
            }).then(() => {window.location.reload()}).catch(err => console.log(err.message))
            console.log(eachOrder);
        }
        const downgradePrepStatus = (eachOrder) => {
            eachOrder.order.map((eachItem, index) => {
                if (eachItem.itemName === "Veg Burger" || eachItem.itemName === "Veg Cheese Burger")
                    eachOrder.order[index].prepStatus = false
            })
            firestore.collection("orders").doc(`${eachOrder.orderNumber}`).update ({
                order: eachOrder.order,
                prepStatus: false
            }).then(() => {window.location.reload()}).catch(err => console.log(err.message))
            console.log(eachOrder);
        }
        return (
            <div style={{marginTop: "10px", display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                {this.state.isPageLoading ? <Spinner /> : 
                <Card style={{width:"max-content", padding:"10px", margin:"10px"}}>
                    <CardTitle tag="h5">
                        BURGER ORDERS
                    </CardTitle>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th>ORDER NO.</th>
                                    <th>NAME</th>
                                    <th>STATUS</th>
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
                                                if (eachItem.quantity && eachItem.itemName.includes("Burger"))
                                                    return (
                                                        <div>
                                                            {eachItem.itemName} - {eachItem.quantity} <br />
                                                            {eachItem.prepStatus ? <Badge style={{cursor:"pointer"}} color="success">PREPARED</Badge> : <Badge onClick={() => updatePrepStatus(each)} style={{cursor:"pointer"}} color="warning">WAITING</Badge> }
                                                        </div>
                                                    )
                                            })}
                                        </td>
                                        <td>
                                            <Button disabled={this.state.isButton} onClick={() => updatePrepStatus(each)} style={{cursor:"pointer", padding:"10px", margin:"10px"}} color="success">{this.state.isButton ? 'LOADING': 'DONE'}</Button><br />
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                </Card>
                }
                <Chaat />
            </div>
        )
    }
}

export default Burger