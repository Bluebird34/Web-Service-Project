import { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, FormGroup, Input, Label } from "reactstrap";

const AjouterCard = () => {

    const [inputs, setInputs] = useState({});
    const history = useHistory();

    //handle the change of input field
    const handleChange = (event) => {
        const eventTargetName = event.target.name;
        const eventTargetValue = event.target.value;
        setInputs(values => ({ ...values, [eventTargetName]: eventTargetValue }))
    }

    //handle the form submit, do fetch POST
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs); 
        fetch('/newCard', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        });
        //link to main route
        history.push('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="Customer Id">Customer Id :</Label>
                    <Input type="number" name="customerId" id="customerId" value={inputs.customerId || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="card No">Card Number :</Label>
                    <Input type="number" name="cardNumber" id="cardNumber" value={inputs.cardNumber || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="card Type">Card Type :</Label>
                    <Input type="text" name="cardType" id="cardType" value={inputs.cardType || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="totalLimit">Total Limit :</Label>
                    <Input type="number" name="totalLimit" id="totalLimit" value={inputs.totalLimit || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="amtUsed">Amt used :</Label>
                    <Input type="number" name="amtUsed" id="amtUsed" value={inputs.amtUsed || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="availAmt">Avail Amt :</Label>
                    <Input type="number" name="availAmt" id="availAmt" value={inputs.availAmt || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="Date">Create Date :</Label>
                    <Input type="date" name="createDate" id="createDate" value={"2024-03-04" || ''}
                        onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/">Cancel</Button>
                </FormGroup>
            </form>
        </div>)
};

export default AjouterCard;