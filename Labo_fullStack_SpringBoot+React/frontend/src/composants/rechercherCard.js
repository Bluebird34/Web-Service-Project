import { Button, Card, Table } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Rechercher = (props) => {
    console.log(props)
    const cardType = props.match.params.type;
    const [listeCards, setListeCards] = useState([]);

    //Get the card info
    useEffect(() => {
        fetch(`/cardsByType/${cardType}`)
            .then((response) => response.json())
            .then((data) => setListeCards(data))
            .catch((error) => console.log(error));
    }, [cardType]);        
    console.log(listeCards)


    const renderListe = listeCards.map(card => {
        return (
            <tr key={card.cardId}>
                <td width="15%">{card.customerId}</td>
                <td width="15%">{card.cardNumber}</td>
                <td width="15%">{card.cardType}</td>
                <td width="15%">{card.totalLimit}</td>
                <td width="15%">{card.amountUsed}</td>
                <td width="15%">{card.availableAmount}</td>
                <td width="15%">{card.createDt}</td>
            </tr>)
    });

    return (
        <div>
            <h1>
                {cardType}
            </h1>
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
                    {renderListe}
                </tbody>
            </Table>   
            <Button tag={Link} to="/">Retoune</Button>        
        </div>
    )
};

export default Rechercher;