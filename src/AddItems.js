import React from "react"
import { CardTitle, Card, Input, Button } from "reactstrap"
import { firestore } from "./config"

class AddItems extends React.Component {
    constructor () {
        super ()
        this.state = {
            itemName: "",
            itemQuantity: undefined,
            itemPrice: undefined
        }
    }
    render () {
        const onChangeHandler = (event) => {
            const {name, value} = event.target
            this.setState ({[name]: value})
        }
        const onSubmitHandler = () => {
            firestore.collection("items").doc(this.state.itemName).set({
                itemName: this.state.itemName,
                itemPrice: parseInt(this.state.itemPrice),
                itemQuantity: parseInt(this.state.itemQuantity),
                status: true
            }).then(() => window.location.reload()).catch(err => console.log(err.message))
        }
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
                <Card style={{width: "250px", padding:"10px", marginTop:"20px"}}>
                    <CardTitle tag="h5">
                        ADD ITEMS
                    </CardTitle>
                    <Input style={{marginBottom:"10px"}} placeholder="Enter the Name" name="itemName" type="text" value={this.state.itemName} onChange={onChangeHandler} />
                    <Input style={{marginBottom:"10px"}} placeholder="Enter the Quantity" name="itemQuantity" type="number" value={this.state.itemQuantity} onChange={onChangeHandler} />
                    <Input style={{marginBottom:"10px"}} placeholder="Enter the Price" name="itemPrice" type="price" value={this.state.itemPrice} onChange={onChangeHandler} />
                    <Button onClick={onSubmitHandler} color="success">
                        SUBMIT
                    </Button>
            </Card>
        </div>
    )
    }
}

export default AddItems