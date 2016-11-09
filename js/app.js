require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('../less/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const {Paper,Set,Circle} = require('./react-raphael');

class App extends React.Component{
    render(){
        var data = [{x:50,y:50,r:40},{x:100,y:100,r:40},{x:200,y:100,r:40},{x:150,y:50,r:40},{x:250,y:50,r:40}]
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Circle x={ele.x} y={ele.y} r={ele.r} />)
                            })
                        }
                        </Set>
                </Paper>)
    }
}

ReactDOM.render(<App />,document.getElementById("react-container"));