require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('../less/index.less');

var React = require('react');
var ReactDOM = require('react-dom');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

class Simple extends React.Component{
    render(){
        var data = [
            {x:50,y:50,r:40,attr:{"stroke":"#0b8ac9","stroke-width":5},animate:Raphael.animation({cx:60},500,"<>")},
            {x:100,y:100,r:40,attr:{"stroke":"#f0c620","stroke-width":5},animate:Raphael.animation({cx:105},500,"<>")},
            {x:150,y:50,r:40,attr:{"stroke":"#1a1a1a","stroke-width":5}},
            {x:200,y:100,r:40,attr:{"stroke":"#10a54a","stroke-width":5},animate:Raphael.animation({cx:195},500,"<>")},
            {x:250,y:50,r:40,attr:{"stroke":"#e11032","stroke-width":5},animate:Raphael.animation({cx:240},500,"<>")}
        ]
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr} animate={ele.animate}/>)
                            })
                        }
                        </Set>
						<Set>
                            <Rect x={30} y={148} width={240} height={150} attr={{"fill":"#10a54a","stroke":"#f0c620","stroke-width":5}}/>
							<Ellipse x={150} y={198} ry={40} rx={100} attr={{"fill":"#fff","stroke":"#e11032"}} glow={{width:10,fill:true,color:"#0b8ac9",opacity:1}}/>
                            <Image src="static/images/5circle.png" x={100} y={170} width={90} height={60} />
							<Text x={150} y={258} text="同一个世界 同一个梦想" attr={{"fill":"#fff"}}/>
							<Text x={150} y={273} text="One World One Dream" attr={{"fill":"#fff"}}/>
							<Path d={["M150 287L150 287"]} animate={Raphael.animation({"path": ["M80 287L220 287"]},500,"<>")} attr={{"stroke":"#fff"}}/>
                            <Line x1={150} y1={290} x2={150} y2={290} animate={Raphael.animation({ x1:80, x2:220},500,"<>")} attr={{"stroke":"#fff"}}/>
						</Set>
                </Paper>)
    }
}


class Paths extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[
            {path:["M10 10L220 10"],attr:{"stroke":"#f0c620","stroke-width":5}},
            {path:["M10 30L220 30"],attr:{"stroke":"#f0c620","stroke-width":5}},
            {path:["M10 50L220 50"],attr:{"stroke":"#f0c620","stroke-width":5}},
            {path:["M10 70L220 70"],attr:{"stroke":"#f0c620","stroke-width":5}},
            {path:["M10 90L220 90"],attr:{"stroke":"#f0c620","stroke-width":5}}
            ]
        }
    }
    handleHoverIn(e) {
       const {self,index} = this.items;
       const { data } = self.state;
       data.forEach((p,i)=>{
           if(i!=index) 
            p.attr.stroke = "#ddd";
       })
       self.setState({
           data
       })
    }
    handleHoverOut(e) {
       const {self,index} = this.items;
       const { data } = self.state;
       data.forEach(p=>{
           p.attr.stroke = "#f0c620";
       })
       self.setState({
           data
       })
    }
    render() {
        const data = this.state.data;
        const self = this;
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Path 
                                key={pos} d={ele.path} attr={ele.attr} data={{index: pos, self }}
                                hover={{in:self.handleHoverIn, out:self.handleHoverOut }}
                                />)
                            })
                        }
                        </Set>
        </Paper>);
    }
}

ReactDOM.render(<Simple />,document.getElementById("react-container"));