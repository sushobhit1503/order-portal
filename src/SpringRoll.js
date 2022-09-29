import React from "react"
import { firestore } from "./config"
import { Card, Table, Badge, CardTitle, Button, Spinner } from "reactstrap"
import Noodle from "./Noodle"

class SpringRoll extends React.Component {
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
        })
    }
    render () {
        const updatePrepStatus = (eachOrder) => {
            let finalStatus = true
            this.setState ({isButton: true})
            eachOrder.order.map((eachItem, index) => {
                if (eachItem.prepStatus === false)
                    finalStatus = false
                if (eachItem.itemName === "Veg Spring Roll" || eachItem.itemName === "Veg Cheese Spring Roll")
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
                if (eachItem.itemName === "Veg Spring Roll" || eachItem.itemName === "Veg Cheese Spring Roll")
                    eachOrder.order[index].prepStatus = false
            })
            firestore.collection("orders").doc(`${eachOrder.orderNumber}`).update ({
                order: eachOrder.order,
                prepStatus: false
            }).then(() => {window.location.reload()}).catch(err => console.log(err.message))
            console.log(eachOrder);
        }
        return (
            <div style={{marginTop: "10px", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                {this.state.isPageLoading ? <Spinner /> : 
                <Card style={{width:"max-content", padding:"10px"}}>
                    <CardTitle tag="h5">
                        ROLL ORDERS
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
                                                if (eachItem.quantity && eachItem.itemName.includes("Spring Roll"))
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
                <Noodle />
            </div>
        )
    }
}

export default SpringRoll