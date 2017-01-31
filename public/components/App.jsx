class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: 'FILL_ME_IN',
      todos: 'FILL_ME_IN'
    };
  }
  render() {
    console.log(typeof NavBar)
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

window.App = App;