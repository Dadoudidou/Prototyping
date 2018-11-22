import * as React from "react"
import * as d3 from "d3"

type props = {
    thickness?: number
    fill?: string
} & d3.DefaultArcObject & React.SVGProps<SVGPathElement>

export default class Arc extends React.PureComponent<props, any>
{
    static defaultProps: Partial<props> = {

    }

    render(){
        const { innerRadius, outerRadius, startAngle, endAngle, padAngle, thickness, ...pathProps  } = this.props;
        let _innerRadius = !innerRadius ? outerRadius - thickness : innerRadius;
        let _outerRadius = outerRadius;
        let _arc = d3.arc()
            .innerRadius(_innerRadius)
            .outerRadius(_outerRadius)
            .padAngle(0.05)
            .cornerRadius(5);
        return (
            <path 
                d={_arc({ startAngle, endAngle, innerRadius: _innerRadius, outerRadius, padAngle })}
                fill={pathProps.fill}
                {...pathProps}
            />
        )   
    }
}