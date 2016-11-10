require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('../less/index.less');

window.React = require('react');
window.ReactDOM = require('react-dom');
window.Raphael = require('raphael');

const {Paper,Set,Circle,Ellipse,Image,Rect,Text,Path} = require('react-raphael');

class App extends React.Component{
    render(){
        var data = [{x:50,y:50,r:40},{x:100,y:100,r:40},{x:200,y:100,r:40},{x:150,y:50,r:40},{x:250,y:50,r:40}]
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} />)
                            })
                        }
                        </Set>
						<Set>
							<Image src="/static/images/5circle.png" x={100} y={170} width={90} height={60} />
							<Ellipse x={150} y={200} ry={30} rx={100} />
							<Rect x={30} y={150} width={240} height={150} />
							<Text x={150} y={250} text="同一个世界 同一个梦想" />
							<Text x={150} y={270} text="One World One Dream" />
							<Path d={["M80 290L220 290"]} />
						</Set>
                </Paper>)
    }
}

ReactDOM.render(<App />,document.getElementById("react-container"));