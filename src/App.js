import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import './App.css'

class App extends Component {
  state = {
    userList: null,
    error: false
  }

  handleChange(userName) {
    if(userName.length > 1) {
      // Si il y a plus d'un caractère dans notre input, on lance une requête GET avec axios pour récupérer les logins des utilisateurs de GitHub qui matches avec son contenu
      axios.get(`https://api.github.com/search/users?q=${userName}+in:login+type:user`)
        .then(response => {
          // Lorsque l'on reçoit les données, on récupère uniquement les logins contenus dans 'data.items' et on les ajoute dans userList
          const logins = response.data.items.map(obj => obj.login)
          this.setState({userList: logins})
        })
        .catch(error => {
            // Si il y a une erreur lors de la requête, on passe error sur true
            this.setState({userList: null, error: true})
        })
    } else this.setState({userList: null, error: false})
  }

  render() {
    // Si la requête nous a renvoyé une erreur, on stocke 'Something went wrong' dans la variable 'userList'
    let userList = this.state.error ? <p>Something went wrong</p> : null
    // Si la liste des logins n'est pas vide, on boucle autour du tableau et on retourne chaque login dans une <li>
    if (this.state.userList) {
      userList = this.state.userList.map( login => 
        <li key={login}>{login}</li>
       )
    }

    return (
      <div className="App">
        <SearchBar changed={e => this.handleChange(e.target.value)} />
        <ul>{ userList }</ul>
      </div>
    )
  }
}

export default App
