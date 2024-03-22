import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import CardList from './composants/cardList';
import AjouterCard from './composants/ajouterCard';
import UpdateLimit from './composants/updateLimit';
import Rechercher from './composants/rechercherCard';

import { Menu, MenuItem } from 'semantic-ui-react';

function App() {
    return (             
        <BrowserRouter> 
            <header>
                <h2>BMO Credit Card System</h2>                
                <Menu>
                    <MenuItem> <NavLink to='/' activeClassName="lien-actif" activeStyle={{ color: "red", fontWeight: "bold" }} exact> Card list </NavLink></MenuItem>
                    <MenuItem> <NavLink to='/ajouter' activeClassName="lien-actif" activeStyle={{ color: "red", fontWeight: "bold" }}> Ajouter card</NavLink></MenuItem>                  
                    <MenuItem> <NavLink to='/recherche' activeClassName="lien-actif" activeStyle={{ color: "red", fontWeight: "bold" }}> Rechercher par card type </NavLink></MenuItem>
                    <MenuItem> <NavLink to='/updatelimit' activeClassName="lien-actif" activeStyle={{ color: "red", fontWeight: "bold" }}> Update card limit</NavLink></MenuItem>                    
                </Menu>
            </header>

            <Switch>
                <Route path="/" component={CardList} exact={true} />
                <Route path="/ajouter" component={AjouterCard} />
                <Route path="/recherche/:type" component={Rechercher} />
                <Route path="/updatelimit/:id" component={UpdateLimit} />
            </Switch>
            
        </BrowserRouter>
    );
}
export default App;