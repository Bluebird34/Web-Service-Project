import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, ButtonGroup, Table } from "reactstrap";
import { Segment } from "semantic-ui-react";


const CardList = () => {
    const [listeCards, setListeCards] = useState([]);
    const [cardType, setCardType] = useState("");
    const [customerId, setCustomerId] = useState("");

    //invoke when the page load
    useEffect(() => {
        fetch('/AllCards')
            .then(response => response.json())
            .then(data => setListeCards(data))
            .catch(error => console.log(error));
    }, []); 

    console.log(listeCards);

    const deleteCard = (id) => { 
        fetch(`/deleteCard/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then(() => {
                setListeCards((values) => {
                    return values.filter((item) => item.id !== id);
                });
            });
        alert("Cette card est supprimé par cardID : " + id)
    };

    console.log(customerId)

    const chargeDelete = () => {
        fetch(`/deleteCardsByCustomerId/${customerId}`, { method: 'DELETE' })
            .then(async response => {
                const data = await response.json();
                console.log(data)   
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        alert('Customer ID : ' + customerId + '----all related cards deleted successful');
    };


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
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/updatelimit/${card.cardId}`}>Update Limit</Button>
                        <Button size="sm" color="danger" onClick={() => deleteCard(card.cardId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>)
    });

    return (
        <div>
            <Segment>
                <Button size="m" color="primary" tag={Link} to={"/ajouter"}>Add New Card</Button>
            </Segment>
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
                        <th width="15%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListe}
                </tbody>
            </Table>

            <Segment>
                <input placeholder="Entrez customer ID"            
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <Button size="m" color="danger" onClick={() => chargeDelete()}>Delete all cards by customer Id</Button>
            </Segment>

            <Segment>
                <input placeholder="Entrez card type,eg: visa"
                    onChange={(e) => setCardType(e.target.value)}
                />
                <Button size="m" color="primary" tag={Link} to={`/recherche/${cardType}`}>Cherche par Card Type</Button>
            </Segment>
        </div>
    )
};

export default CardList;
