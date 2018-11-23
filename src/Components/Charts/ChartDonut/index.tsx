import * as React from "react"
import * as d3 from "d3";
import Arc from "./Arc";

type pieSlice = {
    value: number
    color?: string
    text?: string
    onClick?: (slice: pieSlice) => void
    onMouseOver?: (slice: pieSlice) => void
    onMouseOut?: (slice: pieSlice) => void
}

type props = {
    values?: pieSlice[]
} & React.SVGProps<SVGSVGElement>

type state = {
    selected?: pieSlice
}

export default class ChartDonu extends React.PureComponent<props, state>
{
    state: state = { selected: { value: 268, text: "Loisirs" } }

    componentWillMount(){

    }

    handle_onClick = (slice: pieSlice) => {
        this.setState({
            selected: slice
        })
    }

    render(){
        const { values, ...svgProps } = this.props;
        let _pie = d3.pie<pieSlice>()
            .value(d => d.value)([
            { value: 169, text:"Compétitions" }, { value: 33, text: "Bénévoles" }, { value: 268, text: "Loisirs" }, { value: 158, text: "Ecoles" }
        ]);
        return (
            <svg viewBox='0 0 500 500' {...svgProps} >
                <g transform="translate(250,250)">
                    {_pie.map((slice, index) => (
                        <Arc 
                            key={index}
                            startAngle={slice.startAngle}
                            endAngle={slice.endAngle}
                            padAngle={slice.padAngle}
                            fill={d3.schemeCategory10[index]}
                            outerRadius={this.state.selected ? this.state.selected.value == slice.value ? 250 : 230 : 230}
                            thickness={this.state.selected ? this.state.selected.value == slice.value ? 70 : 50 : 50}
                            onClick={() => this.handle_onClick(slice.data)}
                            style={{ 
                                cursor: "pointer"
                             }}
                        />
                    ))}
                    {this.state.selected && <g>
                        <circle  r="155" fill="#aaa" opacity="0.2" />
                        <text textAnchor="middle" dy="-1em" style={{ fontSize: "2em", fontFamily: "roboto" }} >{this.state.selected.text}</text>
                        <text textAnchor="middle" dy="0.6em" style={{ fontSize: "5em", fontFamily: "roboto" }} >{this.state.selected.value}</text>
                    </g>}
                </g>
                
            </svg>
        )
    }
}