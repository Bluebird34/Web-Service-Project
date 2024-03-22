import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, ButtonGroup,Table } from "reactstrap";

const UpdateLimit = (props) => {
    const cardID = props.match.params.id;
    const [card, setCard] = useState({});
    const [newLimit, setNewLimit] = useState("");


    //Get the card info
    useEffect(() => {
        fetch(`/myCard/${cardID}`)
            .then(response => response.json())
            .then(data => setCard(data))
            .catch(error => console.log(error));
    }, [cardID]);


    console.log(newLimit);

    const chargeUpdate = () => {     
        fetch(`/updateCardLimit/${cardID}?nouvelLimit=${newLimit}`, {method: "PUT"})                        
    };


    return (
        <div>    
            <h1>Card Info : </h1>
            <Table>
                <thead>
                    <tr>
                        <th width="15%">Customer ID</th>
                        <th width="15%">Card No</th>
                        <th width="15%">Card Type</th>
                        <th width="15%">Total Limit</th>
                        <th width="15%">Amt used</th>
                        <th width="15%">Amt avail</th>
                        <th width="15%">Create Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={card.cardId}>
                        <td width="15%">{card.customerId}</td>
                        <td width="15%">{card.cardNumber}</td>
                        <td width="15%">{card.cardType}</td>
                        <td width="15%">{card.totalLimit}</td>
                        <td width="15%">{card.amountUsed}</td>
                        <td width="15%">{card.availableAmount}</td>
                        <td width="15%">{card.createDt}</td>
                    </tr>
                </tbody>
            </Table>
            <input placeholder="Entrer la nouvelle limite"              
                onChange={(e) => setNewLimit(e.target.value)}
            />

            <ButtonGroup>
                <Button color="primary" intent="success" onClick={chargeUpdate()}>Update Limit</Button>
                <Button color="secondary" tag={Link} to="/">Retour</Button>
            </ButtonGroup>

        </div>)
};

export default UpdateLimit;