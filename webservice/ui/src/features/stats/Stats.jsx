import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DataBox from "components/data-box/DataBox";
import GraphPane from "components/graph-pane/GraphPane";
import FontAwesome from "react-fontawesome";
import mq from "../../MqttClient";
import { MQTT, SETTINGS } from "../../constants/constants";
import "./Stats.css";

class Stats extends React.Component {
  constructor( props ) {
    super( props );

    this.handleMqtt = this.handleMqtt.bind( this );
    this.calculatePeople = this.calculatePeople.bind( this );
    this.calculateDuration = this.calculateDuration.bind( this );
    this.state = {
      currentCount: 0,
      currentFrameData: [],
      currentFrameLabels: [],
      durations: [],
      currentDurationAvg: "0:00",
      currentDurationData: [],
      currentDurationLabels: [],
    };
  }

  componentDidMount() {
    // register handler with mqtt client
    mq.addHandler( "person", this.handleMqtt );
  }

  componentWillUnmount() {
    mq.removeHandler( "person" );
  }

  handleMqtt( topic, payload ) {
    switch ( topic ) {
      case MQTT.TOPICS.PERSON:
        this.calculatePeople( payload );
        break;
      case MQTT.TOPICS.DURATION:
        this.calculateDuration( payload );
        break;
      default:
        break;
    }
  }

  calculatePeople( input ) {
    let newLabel = this.state.currentFrameLabels;
    let newFrameData = this.state.currentFrameData;
    newLabel.push( input.timeEntered );
    if ( input.count != undefined ) {
      newFrameData.push( input.count );
    }
    if ( newFrameData.length > SETTINGS.MAX_POINTS ) {
      const sliceFrameData = newFrameData.slice( SETTINGS.SLICE_LENGTH );
      const sliceFrameLabels = newLabel.slice( SETTINGS.SLICE_LENGTH );
      newFrameData = sliceFrameData;
      newLabel = sliceFrameLabels;
    }
    this.setState( { currentCount: input.count,
      currentFrameLabels: newLabel,
      currentFrameData: newFrameData } );
  }

  calculateDuration( input ) {
    const newDuration = this.state.durations;
    newDuration.push( input );
    const newAverage = this.state.durations.reduce( ( a, b ) => {
      return a + b.duration;
    }, 0 ) / this.state.durations.length;
    const format = moment( newAverage, "ss" ).format( "mm:ss" );
    let newDurationLabels = this.state.currentDurationLabels;
    let newDurationData = this.state.currentDurationData;
    newDurationLabels.push( moment().format( "X" ) );
    newDurationData.push( input.duration );
    if ( newDurationData.length > SETTINGS.MAX_POINTS ) {
      const sliceDurationData = newDurationData.slice( SETTINGS.SLICE_LENGTH );
      const sliceDurationLabels = newDurationLabels.slice( SETTINGS.SLICE_LENGTH );
      newDurationData = sliceDurationData;
      newDurationLabels = sliceDurationLabels;
    }

    this.setState( { durations: newDuration,
      currentDurationAvg: format,
      currentDurationLabels: newDurationLabels,
      currentDurationData: newDurationData } );
  }

  render() {
    // Set up graph defaults
    const graphOptions = {
      animation: false,
      legend: {
        display: false,
        position: "top",
      },
      scales: {
        xAxes: [ {
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: false,
          },
          ticks: {
            display: false,
            min: 0,
            max: 60,
            stepSize: 1,
          },
        } ],
        yAxes: [ {
          display: false,
        } ],
      },
    };

    // Graph data for count of people
    const currentCount = {
      labels: this.state.currentFrameLabels,
      datasets: [ {
        label: "People in Frame",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(196,214,0,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.state.currentFrameData,
      } ],
    };

    // Graph data for duration
    const duration = {
      labels: this.state.currentDurationLabels,
      datasets: [ {
        label: "Average duration",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.state.currentDurationData,
      } ],
    };

    return (
      <div className={ `stats ${ this.props.statsOn ? "active" : "" }` }>
        { /* Current count */ }
        <DataBox title="People in frame" data={ this.state.currentCount } />
        <GraphPane graphId="chart1" graphData={ currentCount } graphOptions={ graphOptions } />
        { /* Duration */ }
        <DataBox title="average duration" data={ this.state.currentDurationAvg } color="blue" />
        <GraphPane graphId="chart2" graphData={ duration } graphOptions={ graphOptions } />
        <div className={ `total-count-toggle ${ this.props.totalCountOn ? "hide-toggle" : "" }` }>
          <button onClick={ this.props.toggleTotalCount }><FontAwesome name="toggle-left" size="3x" /></button>
        </div>
        <div className={ `total-count-container ${ this.props.totalCountOn ? "" : "hide-count" }` }>
          <button className="counter-close" onClick={ this.props.toggleTotalCount }><FontAwesome name="toggle-right" size="2x" /></button>
          <DataBox title="Total Counted" data={ this.state.durations.length } color="blue" />
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  statsOn: PropTypes.bool.isRequired,
  totalCountOn: PropTypes.bool.isRequired,
  toggleTotalCount: PropTypes.func.isRequired,
};

Stats.defaultProps = {
};

export default Stats;
