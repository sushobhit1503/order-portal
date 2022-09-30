import React from "react"
import { Button, Card, CardTitle, Input, Modal, ModalBody, Spinner, Table } from "reactstrap"
import { firestore } from "./config"
import firebase from "./config"

class TakeOrders extends React.Component {
    constructor () {
        super ()
        this.state = {
            allItems: [],
            order: [],
            selectedItems: [false, false, false, false, false],
            quantity: [1,1,1,1,1],
            total: 0,
            orderNumber: 0,
            isModalOpen: false,
            isLoading: false,
            isPageLoading: true
        }
    }
    componentDidMount () {
        firestore.collection("items").where("status", "==", true).get().then((Snapshot) => {
            let temp = []
            Snapshot.forEach((document) => {
                temp.push(document.data())
            })
            this.setState ({allItems: temp, order: temp})
            firestore.collection("orderNumber").doc("IDS").get().then(document => {
                this.setState ({orderNumber: document.data().orderNumber, isPageLoading: false})
            }).catch ((err) => console.log(err.message))
        }).catch(err => console.log(err.message))
    }
    render () {
        const onSubmitHandler = () => {
            this.setState ({isLoading: true})
            const { order, selectedItems } = this.state
            let finalOrder = []
            selectedItems.map((eachItem, index) => {
                if (eachItem === true) {
                    let object = {
                        itemName: order[index].itemName,
                        quantity: order[index].quantity,
                        prepStatus: false
                    }
                    finalOrder.push(object)
                }
            })
            finalOrder.map(eachOrder => {
                firestore.collection("items").doc(`${eachOrder.itemName}`).update ({
                    itemQuantity: firebase.firestore.FieldValue.increment(-eachOrder.quantity)
                }).then(() => {}).catch((err) => console.log(err.message))
            })
            firestore.collection("orders").doc(`${this.state.orderNumber}`).set ({
                order: finalOrder,
                orderNumber: this.state.orderNumber,
                total: this.state.total,
                prepStatus: false,
                servedStatus: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                this.setState ({isModalOpen: true})
                firestore.collection("orderNumber").doc("IDS").update ({
                    orderNumber: firebase.firestore.FieldValue.increment(1)
                }).then(() => {}).catch((err) => console.log(err.message))
            }).catch(err => console.log(err.message))
        }
        const onCheckBoxChangeHandler = (eachItem, index) => {
            let temp = this.state.selectedItems
            temp[index] = !temp[index]
            let temp1 = this.state.order
            temp1[index] = eachItem
            temp1[index]["quantity"] = this.state.quantity[index]
            this.setState ({selectedItems: temp}, () => {
                let total = 0
                this.state.selectedItems.map((eachItem, i) => {
                    if (eachItem) {
                        total +=  (this.state.order[i].itemPrice*this.state.order[i].quantity)
                    }
                })
                this.setState ({total: total})
            })
        }
        return (
            <div style={{marginTop: "10px", display:"flex", justifyContent:"center"}}>
                {this.state.isPageLoading ? <Spinner /> : 
                <Card style={{width:"max-content", padding:"10px"}}>
                    <CardTitle tag="h5">
                        TAKE ORDER
                    </CardTitle>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th>SELECT</th>
                                    <th>NAME</th>
                                    <th>LEFT</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.allItems.map((each, index) =>{
                                return (
                                    <tr key={each.itemName}>
                                        <td>
                                            <Input checked={this.state.selectedItems[index]} onChange={() => onCheckBoxChangeHandler(each, index)} type="checkbox" />
                                        </td>
                                        <td>
                                            {each.itemName}
                                        </td>
                                        <td>
                                            {each.itemQuantity}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                        <h5 style={{textAlign:"right"}}>TOTAL: Rs. {this.state.total}</h5>
                        {!this.state.isLoading && <Button style={{width:"max-content", fontWeight:"bold"}} color="success" onClick={onSubmitHandler}>
                            SUBMIT
                        </Button>}
                        {this.state.isLoading && <Button disabled={true} style={{width:"max-content", fontWeight:"bold"}} color="primary" onClick={onSubmitHandler}>
                            LOADING
                        </Button>}
                </Card>
                }
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody tag="h5">
                        ORDER NO. {this.state.orderNumber} CONFIRMED <br />
                        <Button color="success" style={{marginTop:"15px"}} onClick={() => {this.setState ({ isModalOpen: false }); window.location.reload()}}>
                            ANOTHER ORDER
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default TakeOrders